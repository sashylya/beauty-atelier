import React, { useState, useEffect } from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Catalog({ products, filters, favoriteProductIds }) {
    const { auth } = usePage().props;
    const [showFilters, setShowFilters] = useState(false);
    
    // Проверка, активен ли хоть один фильтр (кроме категории и дефолтной сортировки)
    const hasActiveFilters = filters.min_price || filters.max_price || filters.coverage || filters.finish || (filters.sort && filters.sort !== 'newest');

    const [localFilters, setLocalFilters] = useState({
        min_price: filters.min_price || '',
        max_price: filters.max_price || '',
        coverage: filters.coverage || '',
        finish: filters.finish || '',
        sort: filters.sort || 'newest',
    });

    useEffect(() => {
        setLocalFilters({
            min_price: filters.min_price || '',
            max_price: filters.max_price || '',
            coverage: filters.coverage || '',
            finish: filters.finish || '',
            sort: filters.sort || 'newest',
        });
    }, [filters]);

    const applyFilters = (newFilters) => {
        const merged = { ...filters, ...newFilters };
        Object.keys(merged).forEach(key => {
            if (!merged[key] || merged[key] === '') delete merged[key];
        });
        
        // Если сбрасываем всё, оставляем только категорию если она была
        if (Object.keys(newFilters).length === 0) {
            const resetData = filters.category ? { category: filters.category } : {};
            router.get(route('catalog.index'), resetData);
            return;
        }

        router.get(route('catalog.index'), merged, {
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        const emptyFilters = {
            min_price: '',
            max_price: '',
            coverage: '',
            finish: '',
            sort: 'newest'
        };
        setLocalFilters(emptyFilters);
        applyFilters({});
    };

    const handleFilterChange = (name, value) => {
        const updated = { ...localFilters, [name]: value };
        setLocalFilters(updated);
        if (name === 'sort') {
            applyFilters(updated);
        }
    };

    const addToCart = (skuId) => {
        if (!auth.user) {
            router.get(route('login'));
            return;
        }
        
        router.post(route('cart.add', skuId), {}, {
            preserveScroll: true,
            onSuccess: () => {
                // Можно добавить уведомление
            }
        });
    };

    const toggleWishlist = (product) => {
        if (!auth.user) {
            router.get(route('login'));
            return;
        }
        
        const skuId = product.skus && product.skus.length > 0 ? product.skus[0].id : null;
        router.post(route('wishlist.toggle', product.id), { sku_id: skuId }, { preserveScroll: true });
    };

    return (
        <BeautyLayout>
            <Head title="Каталог — Beauty Atelier" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <header className="mb-20">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                        <div>
                            <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-champagne-gold mb-4">Наши основы</p>
                            <h1 className="font-serif italic text-6xl text-deep-espresso">
                                {filters.search ? 'Поиск' : 'Коллекция'}
                            </h1>
                            {filters.search && (
                                <p className="mt-4 text-sm text-deep-espresso/60 uppercase tracking-widest font-medium">
                                    {usePage().props.isFuzzy 
                                        ? <span>Ничего не нашли по точному запросу, возможно вы имели в виду: <span className="text-champagne-gold font-bold">"{filters.search}"</span>?</span>
                                        : <span>Результаты для: <span className="text-deep-espresso font-bold">"{filters.search}"</span></span>
                                    }
                                </p>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-x-10 gap-y-4 uppercase tracking-[0.2em] text-[10px] font-semibold text-deep-espresso/40">
                            <Link href={route('catalog.index')} className={!filters.category ? 'text-deep-espresso border-b border-deep-espresso' : 'hover:text-deep-espresso transition'}>Все</Link>
                            <Link href={route('catalog.index', { category: 'face' })} className={filters.category === 'face' ? 'text-deep-espresso border-b border-deep-espresso' : 'hover:text-deep-espresso transition'}>Лицо</Link>
                            <Link href={route('catalog.index', { category: 'eyes' })} className={filters.category === 'eyes' ? 'text-deep-espresso border-b border-deep-espresso' : 'hover:text-deep-espresso transition'}>Глаза</Link>
                            <Link href={route('catalog.index', { category: 'lips' })} className={filters.category === 'lips' ? 'text-deep-espresso border-b border-deep-espresso' : 'hover:text-deep-espresso transition'}>Губы</Link>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center py-4 border-y border-deep-espresso/10">
                         <div className="uppercase tracking-[0.2em] text-[9px] font-semibold opacity-60">
                            {products.length} Товаров
                         </div>
                         <div className="flex space-x-12 items-center uppercase tracking-[0.2em] text-[9px] font-semibold">
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center gap-2 hover:text-champagne-gold transition ${showFilters ? 'text-champagne-gold' : ''}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m-9.75 0h9.75" />
                                    </svg>
                                    Фильтры {hasActiveFilters && <span className="w-1.5 h-1.5 bg-champagne-gold rounded-full"></span>}
                                </button>
                                
                                {hasActiveFilters && (
                                    <button 
                                        onClick={handleReset}
                                        className="text-[8px] text-red-800/50 hover:text-red-800 transition border-b border-red-800/20 pb-0.5"
                                    >
                                        Сбросить всё
                                    </button>
                                )}
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <span className="opacity-40">Сортировка:</span>
                                <select 
                                    value={localFilters.sort}
                                    onChange={(e) => handleFilterChange('sort', e.target.value)}
                                    className="bg-transparent border-none p-0 text-[9px] uppercase tracking-[0.2em] font-bold focus:ring-0 cursor-pointer"
                                >
                                    <option value="newest">Новинки</option>
                                    <option value="price_asc">Цена: По возрастанию</option>
                                    <option value="price_desc">Цена: По убыванию</option>
                                    <option value="name_asc">Название: А-Я</option>
                                </select>
                            </div>
                         </div>
                    </div>

                    {showFilters && (
                        <div className="py-10 border-b border-deep-espresso/5 animate-fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                                <div>
                                    <p className="text-[10px] uppercase font-bold mb-6 tracking-widest">Цена</p>
                                    <div className="flex items-center gap-4">
                                        <input 
                                            type="number" 
                                            placeholder="От" 
                                            value={localFilters.min_price}
                                            onChange={(e) => handleFilterChange('min_price', e.target.value)}
                                            className="w-full bg-transparent border-deep-espresso/10 p-2 text-xs focus:border-champagne-gold focus:ring-0"
                                        />
                                        <input 
                                            type="number" 
                                            placeholder="До" 
                                            value={localFilters.max_price}
                                            onChange={(e) => handleFilterChange('max_price', e.target.value)}
                                            className="w-full bg-transparent border-deep-espresso/10 p-2 text-xs focus:border-champagne-gold focus:ring-0"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase font-bold mb-6 tracking-widest">Покрытие</p>
                                    <select 
                                        value={localFilters.coverage}
                                        onChange={(e) => handleFilterChange('coverage', e.target.value)}
                                        className="w-full bg-transparent border-deep-espresso/10 p-2 text-xs focus:ring-0"
                                    >
                                        <option value="">Все виды</option>
                                        <option value="Вуальное">Вуальное</option>
                                        <option value="Легкое">Легкое</option>
                                        <option value="Среднее">Среднее</option>
                                        <option value="Полное">Полное</option>
                                    </select>
                                </div>

                                <div>
                                    <p className="text-[10px] uppercase font-bold mb-6 tracking-widest">Финиш</p>
                                    <select 
                                        value={localFilters.finish}
                                        onChange={(e) => handleFilterChange('finish', e.target.value)}
                                        className="w-full bg-transparent border-deep-espresso/10 p-2 text-xs focus:ring-0"
                                    >
                                        <option value="">Любой</option>
                                        <option value="Матовый">Матовый</option>
                                        <option value="Сатиновый">Сатиновый</option>
                                        <option value="Глянцевый">Глянцевый</option>
                                        <option value="Натуральный">Натуральный</option>
                                        <option value="Сияющий">Сияющий</option>
                                    </select>
                                </div>

                                <div className="flex items-end gap-4">
                                    <button 
                                        onClick={() => applyFilters(localFilters)}
                                        className="flex-1 bg-deep-espresso text-creamy-silk uppercase tracking-widest text-[10px] font-bold py-3 hover:bg-black transition duration-500"
                                    >
                                        Применить
                                    </button>
                                    <button 
                                        onClick={handleReset}
                                        className="px-6 py-3 text-[9px] uppercase tracking-[0.2em] font-bold text-deep-espresso/40 hover:text-deep-espresso transition duration-500"
                                    >
                                        Очистить
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                    {products.map((product) => (
                        <div key={product.id} className="group">
                            <Link href={route('catalog.show', product.slug)} className="block">
                                <div className="aspect-[4/5] overflow-hidden bg-[#F0F0F0] mb-6 relative border border-deep-espresso/5 shadow-sm">
                                    <div className="w-full h-full flex items-center justify-center transition-transform duration-1000 ease-out group-hover:scale-110">
                                        <div className="absolute inset-0 bg-gradient-to-t from-deep-espresso/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        {product.image_path ? (
                                            <img 
                                                src={`/storage/${product.image_path}`} 
                                                alt={product.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="font-serif italic text-neutral-300 text-2xl uppercase tracking-widest">{product.category}</span>
                                        )}
                                    </div>
                                    {product.is_hit && (
                                        <div className="absolute top-6 left-6 bg-champagne-gold/90 backdrop-blur-sm text-creamy-silk text-[8px] uppercase tracking-[0.3em] px-3 py-1.5 font-bold">
                                            Хит
                                        </div>
                                    )}
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            toggleWishlist(product);
                                        }}
                                        className="absolute top-6 right-6 z-20 transition-all duration-300 hover:scale-110"
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            fill={favoriteProductIds.includes(product.id) ? "#D4AF37" : "none"} 
                                            viewBox="0 0 24 24" 
                                            strokeWidth={1.5} 
                                            stroke={favoriteProductIds.includes(product.id) ? "#D4AF37" : "currentColor"} 
                                            className={`w-5 h-5 ${favoriteProductIds.includes(product.id) ? '' : 'text-deep-espresso/30 hover:text-champagne-gold'}`}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="text-center px-4">
                                    <h3 className="uppercase tracking-[0.2em] text-[11px] font-bold mb-2 group-hover:text-champagne-gold transition-colors duration-300">{product.name}</h3>
                                    <p className="font-serif italic text-deep-espresso/50 text-xs mb-2">
                                        {product.skus.length > 0 ? `${product.skus.length} Оттенков` : '1 Оттенок'}
                                    </p>
                                    <p className="uppercase tracking-[0.1em] text-xs font-semibold mb-4">
                                        {product.price 
                                            ? `${parseFloat(product.price).toLocaleString()} ₽` 
                                            : (product.skus.length > 0 
                                                ? `${Math.min(...product.skus.map(s => s.price)).toLocaleString()} ₽` 
                                                : '—')
                                        }
                                    </p>
                                </div>
                            </Link>
                            {product.skus && product.skus.length > 0 && (
                                <div className="px-4 mt-2">
                                    {product.skus.some(s => s.stock > 0) ? (
                                        <button 
                                            onClick={() => addToCart(product.skus.find(s => s.stock > 0).id)}
                                            className="w-full py-3 bg-deep-espresso text-creamy-silk text-[10px] uppercase tracking-widest font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hover:bg-black pointer-events-none group-hover:pointer-events-auto"
                                        >
                                            В корзину
                                        </button>
                                    ) : (
                                        <div className="w-full py-3 bg-red-800/5 text-red-800 text-[10px] uppercase tracking-widest font-bold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 text-center">
                                            Нет в наличии
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                
                {products.length === 0 && (
                    <div className="py-40 text-center">
                        <p className="font-serif italic text-2xl text-deep-espresso/40 tracking-widest">Ничего не найдено</p>
                        <button 
                            onClick={handleReset}
                            className="mt-8 inline-block uppercase tracking-[0.2em] text-[10px] font-bold border-b border-deep-espresso pb-1 text-deep-espresso hover:text-champagne-gold transition-colors"
                        >
                            Сбросить фильтры
                        </button>
                    </div>
                )}
            </div>
        </BeautyLayout>
    );
}