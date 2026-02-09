import React, { useState } from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Show({ product }) {
    // Если SKU нет, создаем "фейковый" объект из данных товара для обратной совместимости
    const defaultSku = product.skus.length > 0 ? product.skus[0] : {
        id: null,
        shade_name: 'Стандартный',
        price: product.price || 0,
        color_hex: '#F9F9F9',
        stock: 1,
        coverage: '—',
        finish: '—',
        dress_code: '—'
    };

    const [selectedSku, setSelectedSku] = useState(defaultSku);
    const [comparisonSku, setComparisonSku] = useState(null);
    const [isComparing, setIsComparing] = useState(false);

    const { post, processing } = useForm();

    const addToCart = () => {
        if (!selectedSku.id) {
            alert('Для этого товара не настроены варианты покупки (SKU).');
            return;
        }
        post(route('cart.add', selectedSku.id));
    };

    return (
        <BeautyLayout>
            <Head title={`${product.name} — Beauty Atelier`} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                    
                    {/* Left: Sticky Image Gallery (7/12 cols) */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="aspect-[4/5] bg-white flex items-center justify-center relative overflow-hidden group">
                             <div 
                                className="absolute inset-0 transition-all duration-1000 ease-in-out"
                                style={{ backgroundColor: `${selectedSku.color_hex}08` }}
                             ></div>
                             
                             {/* Comparison Overlay */}
                             {isComparing && comparisonSku && (
                                <div className="absolute inset-0 z-20 flex animate-fade-in bg-white">
                                    <div className="w-1/2 h-full relative overflow-hidden border-r border-[#3D2B1F]/10">
                                        {/* Left Side: Selected Sku */}
                                        <div className="absolute inset-0">
                                            {selectedSku.image_url ? (
                                                <img src={`/storage/${selectedSku.image_url}`} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <img src={`/storage/${product.image_path}`} alt="" className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="font-serif italic text-sm lg:text-xl text-[#3D2B1F] bg-white/90 backdrop-blur-sm px-6 py-3 shadow-lg uppercase tracking-widest border border-[#3D2B1F]/5">{selectedSku.shade_name}</span>
                                        </div>
                                    </div>
                                    <div className="w-1/2 h-full relative overflow-hidden">
                                        {/* Right Side: Comparison Sku */}
                                        <div className="absolute inset-0">
                                            {comparisonSku.image_url ? (
                                                <img src={`/storage/${comparisonSku.image_url}`} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <img src={`/storage/${product.image_path}`} alt="" className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="font-serif italic text-sm lg:text-xl text-[#3D2B1F] bg-white/90 backdrop-blur-sm px-6 py-3 shadow-lg uppercase tracking-widest border border-[#3D2B1F]/5">{comparisonSku.shade_name}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => setIsComparing(false)}
                                        className="absolute top-6 right-6 z-30 bg-[#3D2B1F] text-white w-10 h-10 rounded-full flex items-center justify-center text-sm hover:scale-110 transition-transform shadow-xl"
                                    >
                                        ✕
                                    </button>
                                </div>
                             )}

                             {/* Decorative Text background */}
                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                                <span className="font-serif italic text-[20vw] lg:text-[12vw] text-deep-espresso/[0.03] uppercase tracking-tighter leading-none whitespace-nowrap transition-transform duration-1000 group-hover:scale-110">
                                    Ателье
                                </span>
                             </div>

                             {/* Main Product Visual */}
                             <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                                {selectedSku.image_url ? (
                                    <img 
                                        src={`/storage/${selectedSku.image_url}`} 
                                        alt={selectedSku.shade_name} 
                                        className="w-full h-full object-cover animate-fade-in"
                                        key={selectedSku.id} // Перезагружаем анимацию при смене
                                    />
                                ) : (
                                    product.image_path ? (
                                        <img 
                                            src={`/storage/${product.image_path}`} 
                                            alt={product.name} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <p className="font-serif italic text-4xl text-deep-espresso mb-4 opacity-10">{product.name}</p>
                                            <div 
                                                className="w-24 h-24 mx-auto rounded-full shadow-2xl border-4 border-white"
                                                style={{ backgroundColor: selectedSku.color_hex }}
                                            ></div>
                                        </div>
                                    )
                                )}
                             </div>

                             {Boolean(product.is_look_of_month) && (
                                <div className="absolute bottom-10 right-10 flex flex-col items-end">
                                    <span className="uppercase tracking-[0.4em] text-[8px] font-bold text-champagne-gold mb-2">Выбор редактора</span>
                                    <span className="font-serif italic text-xl">Образ месяца</span>
                                </div>
                             )}
                        </div>
                    </div>

                    {/* Right: Product Details (5/12 cols) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-40">
                        <div className="mb-12">
                            <nav className="flex space-x-4 uppercase tracking-[0.3em] text-[8px] font-bold text-deep-espresso/40 mb-8">
                                <Link href={route('catalog.index')} className="hover:text-deep-espresso transition">Коллекция</Link>
                                <span>/</span>
                                <span className="text-champagne-gold uppercase">{product.category}</span>
                            </nav>
                            
                            <h1 className="font-serif italic text-5xl lg:text-6xl text-deep-espresso mb-8 leading-tight">
                                {product.name}
                            </h1>
                            
                            <div className="flex items-baseline space-x-6 mb-12">
                                <span className="text-3xl font-light tracking-tight text-deep-espresso">
                                    {parseFloat(selectedSku.price || product.price || 0).toLocaleString()} ₽
                                </span>
                            </div>

                            <p className="text-deep-espresso/70 leading-relaxed mb-12 text-sm lg:text-base">
                                {product.description}
                            </p>

                            {/* Texture/Video Preview */}
                            {selectedSku.video_url && (
                                <div className="mb-12 animate-fade-in">
                                    <p className="uppercase tracking-[0.2em] text-[10px] font-bold mb-4 text-champagne-gold">
                                        Текстура и нанесение
                                    </p>
                                    <div className="aspect-video bg-white overflow-hidden border border-deep-espresso/5 shadow-inner relative group">
                                        {selectedSku.video_url.match(/\.(mp4|webm|ogg)$/i) || selectedSku.video_url.includes('vimeo') || selectedSku.video_url.includes('youtube') ? (
                                            <div className="w-full h-full bg-creamy-silk flex items-center justify-center">
                                                {/* Simple detection for direct video files */}
                                                {selectedSku.video_url.match(/\.(mp4|webm|ogg)$/i) ? (
                                                    <video 
                                                        src={selectedSku.video_url} 
                                                        autoPlay 
                                                        loop 
                                                        muted 
                                                        playsInline 
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    /* If it's a YouTube/Vimeo link, we show a link or iframe */
                                                    <a 
                                                        href={selectedSku.video_url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="flex flex-col items-center gap-4 text-deep-espresso/40 hover:text-champagne-gold transition-colors"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                                                        </svg>
                                                        <span className="text-[9px] uppercase tracking-widest font-bold">Смотреть туториал</span>
                                                    </a>
                                                )}
                                            </div>
                                        ) : (
                                            /* Treat as image swatch */
                                            <img 
                                                src={selectedSku.video_url} 
                                                alt="Текстура" 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Shade Selection */}
                        {product.skus.length > 0 && (
                            <div className="mb-16">
                                <div className="flex justify-between items-end mb-6">
                                    <p className="uppercase tracking-[0.2em] text-[10px] font-bold">
                                        Выбранный оттенок
                                    </p>
                                    <span className="font-serif italic text-sm text-deep-espresso/60">{selectedSku.shade_name}</span>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {product.skus.map((sku) => (
                                        <button
                                            key={sku.id}
                                            onClick={() => setSelectedSku(sku)}
                                            className={`group relative w-12 h-12 rounded-full transition-all duration-500 ease-out ${
                                                selectedSku.id === sku.id ? 'ring-2 ring-deep-espresso ring-offset-4 ring-offset-creamy-silk' : 'hover:ring-1 hover:ring-deep-espresso/20 hover:ring-offset-2 hover:ring-offset-creamy-silk'
                                            }`}
                                        >
                                            <div 
                                                className="w-full h-full rounded-full shadow-inner transition-transform duration-500 group-hover:scale-90"
                                                style={{ backgroundColor: sku.color_hex }}
                                            ></div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Attributes Grid */}
                        <div className="grid grid-cols-2 gap-12 mb-16 border-y border-deep-espresso/10 py-10">
                            <div className="space-y-2">
                                <p className="uppercase tracking-[0.3em] text-[8px] font-black text-deep-espresso/30">Покрытие</p>
                                <p className="text-[11px] uppercase tracking-[0.2em] font-bold">{selectedSku.coverage}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="uppercase tracking-[0.3em] text-[8px] font-black text-deep-espresso/30">Финиш</p>
                                <p className="text-[11px] uppercase tracking-[0.2em] font-bold">{selectedSku.finish}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="uppercase tracking-[0.3em] text-[8px] font-black text-deep-espresso/30">Дресс-код</p>
                                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-champagne-gold">{selectedSku.dress_code}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="uppercase tracking-[0.3em] text-[8px] font-black text-deep-espresso/30">Наличие</p>
                                <p className="text-[11px] uppercase tracking-[0.2em] font-bold">{(selectedSku.stock > 0 || !selectedSku.id) ? 'В наличии' : 'Нет в наличии'}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col space-y-4">
                            <button 
                                onClick={addToCart}
                                disabled={processing || (product.skus.length === 0 && !product.price)}
                                className="w-full bg-deep-espresso text-creamy-silk uppercase tracking-[0.4em] text-[11px] font-bold py-6 hover:bg-black transition-all duration-500 shadow-2xl hover:shadow-none translate-y-0 hover:translate-y-1 disabled:opacity-50"
                            >
                                {product.skus.length === 0 && !product.price ? 'Скоро в продаже' : (processing ? 'Добавляем...' : 'Добавить в корзину')}
                            </button>
                            
                            {product.skus.length > 1 && (
                                <button 
                                    onClick={() => {
                                        if (isComparing) {
                                            setIsComparing(false);
                                        } else {
                                            setIsComparing(true);
                                            const other = product.skus.find(s => s.id !== selectedSku.id);
                                            if (other) setComparisonSku(other);
                                        }
                                    }}
                                    className={`w-full border border-deep-espresso uppercase tracking-[0.4em] text-[11px] font-bold py-6 transition-all duration-500 ${
                                        isComparing ? 'bg-champagne-gold text-white border-champagne-gold' : 'text-deep-espresso hover:bg-deep-espresso hover:text-creamy-silk'
                                    }`}
                                >
                                    {isComparing ? 'Закрыть примерку' : 'Виртуальная примерка'}
                                </button>
                            )}
                        </div>
                        
                        {isComparing && (
                            <div className="mt-8 p-6 bg-creamy-silk border border-champagne-gold/20 animate-fade-in">
                                <p className="uppercase tracking-[0.2em] text-[9px] font-bold text-champagne-gold mb-4">Выберите оттенок для сравнения</p>
                                <div className="flex flex-wrap gap-3">
                                    {product.skus.map((sku) => (
                                        <button
                                            key={sku.id}
                                            onClick={() => setComparisonSku(sku)}
                                            className={`w-8 h-8 rounded-full border transition-all ${
                                                comparisonSku?.id === sku.id ? 'border-champagne-gold scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                        >
                                            <div className="w-full h-full rounded-full shadow-sm" style={{ backgroundColor: sku.color_hex }}></div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        {/* Info Accordion */}
                        <div className="mt-16 space-y-4">
                            <details className="group border-b border-deep-espresso/10 pb-6 cursor-pointer">
                                <summary className="list-none flex justify-between items-center uppercase tracking-[0.2em] text-[10px] font-bold group-open:text-champagne-gold transition-colors">
                                    Состав
                                    <span className="text-lg group-open:rotate-45 transition-transform duration-300 font-light">+</span>
                                </summary>
                                <div className="mt-6 text-[13px] text-deep-espresso/60 leading-relaxed font-light whitespace-pre-line">
                                    {product.composition || 'Состав уточняется у производителя.'}
                                </div>
                            </details>
                            <details className="group border-b border-deep-espresso/10 pb-6 cursor-pointer">
                                <summary className="list-none flex justify-between items-center uppercase tracking-[0.2em] text-[10px] font-bold group-open:text-champagne-gold transition-colors">
                                    Доставка
                                    <span className="text-lg group-open:rotate-45 transition-transform duration-300 font-light">+</span>
                                </summary>
                                <div className="mt-6 text-[13px] text-deep-espresso/60 leading-relaxed font-light">
                                    Фирменная упаковка в подарок при заказе от 2 000 ₽. <br/>
                                    Доставка в течение 2-3 рабочих дней по Москве.
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </BeautyLayout>
    );
}