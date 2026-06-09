import React, { useState } from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, useForm, Link, usePage, router } from '@inertiajs/react';

export default function Show({ product, reviews = [], averageRating = 0 }) {
    const { auth, flash, favoriteSkuIds = [] } = usePage().props;
    
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
    const [activeImage, setActiveImage] = useState(null);

    // Собираем изображения: SKU-специфичные + общие фото товара
    const skuImages = [
        selectedSku.image_url ? `/storage/${selectedSku.image_url}` : null,
        ...(selectedSku.additional_images || []).map(path => `/storage/${path}`)
    ].filter(Boolean);

    const productImages = [
        product.image_path ? `/storage/${product.image_path}` : null,
        ...(product.additional_images || []).map(path => `/storage/${path}`)
    ].filter(Boolean);

    // Объединяем, убирая дубликаты. SKU-фото в начале.
    const allImages = [...skuImages, ...productImages].filter((img, index, self) => self.indexOf(img) === index);

    // Обновляем активное изображение при смене SKU
    React.useEffect(() => {
        if (skuImages.length > 0) {
            setActiveImage(skuImages[0]);
        } else if (productImages.length > 0) {
            setActiveImage(productImages[0]);
        }
    }, [selectedSku]);

    // Инициализация при первой загрузке
    React.useEffect(() => {
        if (!activeImage) {
            const initial = selectedSku.image_url || product.image_path;
            if (initial) setActiveImage(`/storage/${initial}`);
        }
    }, []);

    const { post, processing } = useForm();

    const addToCart = () => {
        if (!auth.user) {
            router.get(route('login'));
            return;
        }

        if (!selectedSku.id) {
            alert('Для этого товара не настроены варианты покупки (SKU).');
            return;
        }
        post(route('cart.add', selectedSku.id));
    };

    const toggleWishlist = () => {
        if (!auth.user) {
            router.get(route('login'));
            return;
        }
        router.post(route('wishlist.toggle', product.id), { sku_id: selectedSku.id }, { preserveScroll: true });
    };

    const isFavorited = (favoriteSkuIds || []).includes(selectedSku.id);

    // Form for reviews
    const { data: reviewData, setData: setReviewData, post: postReview, processing: processingReview, reset: resetReview, errors: reviewErrors } = useForm({
        rating: 5,
        comment: '',
        sku_id: selectedSku?.id || null,
    });

    // Update sku_id in form when selectedSku changes
    React.useEffect(() => {
        setReviewData('sku_id', selectedSku?.id || null);
    }, [selectedSku]);

    const submitReview = (e) => {
        e.preventDefault();
        postReview(route('reviews.store', product.id), {
            onSuccess: () => resetReview(),
            preserveScroll: true,
        });
    };

    const categoryLabels = {
        'face': 'Лицо',
        'eyes': 'Глаза',
        'lips': 'Губы',
        'tools': 'Инструменты'
    };

    return (
        <BeautyLayout>
            <Head title={`${product.name} — Beauty Atelier`} />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* Left: Sticky Image Gallery */}
                    <div className="lg:col-span-6 space-y-8">
                        <div className="aspect-[4/5] bg-white flex items-center justify-center relative overflow-hidden group max-w-[420px] sm:max-w-[500px] mx-auto">
                             <div 
                                className="absolute inset-0 transition-all duration-1000 ease-in-out"
                                style={{ backgroundColor: `${selectedSku.color_hex}08` }}
                             ></div>
                             
                             {/* Comparison Overlay */}
                             {isComparing && comparisonSku && (
                                <div className="absolute inset-0 z-20 flex animate-fade-in bg-white">
                                    <div className="w-1/2 h-full relative overflow-hidden border-r border-[#3D2B1F]/10">
                                        <div className="absolute inset-0">
                                            {selectedSku.image_url ? (
                                                <img src={`/storage/${selectedSku.image_url}`} alt="" className="w-full h-full object-contain" />
                                            ) : (
                                                <img src={`/storage/${product.image_path}`} alt="" className="w-full h-full object-contain" />
                                            )}
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="font-serif italic text-xs lg:text-sm text-[#3D2B1F] bg-white/90 backdrop-blur-sm px-4 py-2 shadow-lg uppercase tracking-widest border border-[#3D2B1F]/5">{selectedSku.shade_name}</span>
                                        </div>
                                    </div>
                                    <div className="w-1/2 h-full relative overflow-hidden">
                                        <div className="absolute inset-0">
                                            {comparisonSku.image_url ? (
                                                <img src={`/storage/${comparisonSku.image_url}`} alt="" className="w-full h-full object-contain" />
                                            ) : (
                                                <img src={`/storage/${product.image_path}`} alt="" className="w-full h-full object-contain" />
                                            )}
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="font-serif italic text-xs lg:text-sm text-[#3D2B1F] bg-white/90 backdrop-blur-sm px-4 py-2 shadow-lg uppercase tracking-widest border border-[#3D2B1F]/5">{comparisonSku.shade_name}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => setIsComparing(false)} className="absolute top-4 right-4 z-30 bg-[#3D2B1F] text-white w-8 h-8 rounded-full flex items-center justify-center text-xs hover:scale-110 transition-transform shadow-xl">✕</button>
                                </div>
                             )}

                             {/* Decorative Text */}
                             <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                                <span className="font-serif italic text-[15vw] lg:text-[10vw] text-deep-espresso/[0.03] uppercase tracking-tighter leading-none whitespace-nowrap transition-transform duration-1000 group-hover:scale-110">Ателье</span>
                             </div>

                             {product.is_hit && (
                                <div className="absolute top-6 left-6 z-20 bg-champagne-gold/90 backdrop-blur-sm text-creamy-silk text-[8px] uppercase tracking-[0.3em] px-4 py-2 font-bold shadow-xl animate-fade-in">
                                    Хит продаж
                                </div>
                             )}

                             {/* Main Visual */}
                             <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                                {activeImage ? (
                                    <img src={activeImage} alt={product.name} className="w-full h-full object-cover animate-fade-in" key={activeImage} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center opacity-10">
                                        <span className="font-serif italic text-6xl">BA</span>
                                    </div>
                                )}
                             </div>
                        </div>

                        {/* Thumbnails */}
                        {allImages.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide justify-center">
                                {allImages.map((img, idx) => (
                                    <button 
                                        key={idx} 
                                        onClick={() => setActiveImage(img)}
                                        className={`w-16 h-16 flex-shrink-0 border-2 transition-all duration-300 ${activeImage === img ? 'border-[#3D2B1F]' : 'border-transparent hover:border-[#3D2B1F]/20'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Details */}
                    <div className="lg:col-span-6 lg:sticky lg:top-32">
                        <Link 
                            href={route('catalog.index')}
                            className="inline-flex items-center gap-2 uppercase tracking-[0.3em] text-[9px] font-bold text-deep-espresso/40 hover:text-champagne-gold transition mb-8 group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-2.5 h-2.5 transition-transform group-hover:-translate-x-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Назад в каталог
                        </Link>

                        <div className="mb-8">
                            <nav className="flex space-x-3 uppercase tracking-[0.3em] text-[7px] font-bold text-deep-espresso/40 mb-6">
                                <Link href={route('catalog.index')} className="hover:text-deep-espresso transition">Коллекция</Link>
                                <span>/</span>
                                <span className="text-champagne-gold uppercase">{categoryLabels[product.category] || product.category}</span>
                            </nav>
                            <h1 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-deep-espresso mb-6 leading-tight break-words">{product.name}</h1>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-8">
                                <span className="text-2xl font-light tracking-tight text-deep-espresso">{parseFloat(selectedSku.price || product.price || 0).toLocaleString()} ₽</span>
                                {averageRating > 0 && (
                                    <div className="flex items-center gap-1.5">
                                        <div className="flex text-champagne-gold">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className={`w-3.5 h-3.5 ${i < Math.round(averageRating) ? 'fill-current' : 'fill-none stroke-current'}`} viewBox="0 0 24 24">
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-[12px] font-serif italic text-deep-espresso/60">{averageRating} / 5</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-deep-espresso/70 leading-relaxed mb-8 text-xs lg:text-sm">{product.description}</p>
                        </div>

                        {/* Shade Selection */}
                        {product.skus.length > 0 && (
                            <div className="mb-10">
                                <div className="flex justify-between items-end mb-4">
                                    <p className="uppercase tracking-[0.2em] text-[9px] font-bold">Выбранный оттенок</p>
                                    <span className="font-serif italic text-xs text-deep-espresso/60">{selectedSku.shade_name}</span>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {product.skus.map((sku) => (
                                        <button key={sku.id} onClick={() => setSelectedSku(sku)} className={`group relative w-10 h-10 rounded-full transition-all duration-500 ease-out ${selectedSku.id === sku.id ? 'ring-2 ring-deep-espresso ring-offset-4 ring-offset-creamy-silk' : 'hover:ring-1 hover:ring-deep-espresso/20 hover:ring-offset-2 hover:ring-offset-creamy-silk'}`}>
                                            <div className="w-full h-full rounded-full shadow-inner transition-transform duration-500 group-hover:scale-90" style={{ backgroundColor: sku.color_hex }}></div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Attributes */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-10 border-y border-deep-espresso/10 py-8">
                            <div className="space-y-1">
                                <p className="uppercase tracking-[0.3em] text-[7px] font-black text-deep-espresso/30">Покрытие</p>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold">{selectedSku.coverage}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="uppercase tracking-[0.3em] text-[7px] font-black text-deep-espresso/30">Финиш</p>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold">{selectedSku.finish}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="uppercase tracking-[0.3em] text-[7px] font-black text-deep-espresso/30">Дресс-код</p>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-champagne-gold">{selectedSku.dress_code}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="uppercase tracking-[0.3em] text-[7px] font-black text-deep-espresso/30">Наличие</p>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold">{(selectedSku.stock > 0 || !selectedSku.id) ? 'В наличии' : 'Нет в наличии'}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mb-3">
                            <button 
                                onClick={addToCart}
                                disabled={processing || product.skus.length === 0 || (selectedSku.id && selectedSku.stock <= 0)}
                                className="flex-1 bg-deep-espresso text-creamy-silk uppercase tracking-[0.22em] sm:tracking-[0.4em] text-[10px] font-bold py-5 hover:bg-black transition-all duration-500 shadow-xl hover:shadow-none translate-y-0 hover:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {product.skus.length === 0 
                                    ? 'Нет в наличии' 
                                    : (selectedSku.id && selectedSku.stock <= 0 
                                        ? 'Нет в наличии' 
                                        : (processing ? 'Добавляем...' : 'Добавить в корзину'))}
                            </button>
                            
                            <button 
                                onClick={toggleWishlist}
                                className={`w-16 border border-deep-espresso flex items-center justify-center transition-all duration-500 hover:bg-[#FDF5E6] ${isFavorited ? 'bg-[#FDF5E6]' : ''}`}
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    fill={isFavorited ? "#D4AF37" : "none"} 
                                    viewBox="0 0 24 24" 
                                    strokeWidth={1.5} 
                                    stroke={isFavorited ? "#D4AF37" : "currentColor"} 
                                    className="w-5 h-5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </button>
                        </div>
                        
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
                                className={`w-full border border-deep-espresso uppercase tracking-[0.22em] sm:tracking-[0.4em] text-[10px] font-bold py-5 transition-all duration-500 mb-8 ${
                                    isComparing ? 'bg-champagne-gold text-white border-champagne-gold' : 'text-deep-espresso hover:bg-deep-espresso hover:text-creamy-silk'
                                }`}
                            >
                                {isComparing ? 'Закрыть сравнение' : 'Сравнить оттенки'}
                            </button>
                        )}
                        
                        {/* Info Accordion */}
                        <div className="mt-12 space-y-3">
                            <details className="group border-b border-deep-espresso/10 pb-4 cursor-pointer">
                                <summary className="list-none flex justify-between items-center uppercase tracking-[0.2em] text-[9px] font-bold group-open:text-champagne-gold transition-colors">Состав<span className="text-lg group-open:rotate-45 transition-transform duration-300 font-light">+</span></summary>
                                <div className="mt-4 text-[12px] text-deep-espresso/60 leading-relaxed font-light whitespace-pre-line">{product.composition || 'Состав уточняется у производителя.'}</div>
                            </details>
                            <details className="group border-b border-deep-espresso/10 pb-4 cursor-pointer">
                                <summary className="list-none flex justify-between items-center uppercase tracking-[0.2em] text-[9px] font-bold group-open:text-champagne-gold transition-colors">Доставка<span className="text-lg group-open:rotate-45 transition-transform duration-300 font-light">+</span></summary>
                                <div className="mt-4 text-[12px] text-deep-espresso/60 leading-relaxed font-light">Бесплатная доставка при заказе от 2 000 ₽. <br/>При заказе до 2 000 ₽ стоимость доставки — 200 ₽. <br/>Доставка в течение 2-3 рабочих дней по Москве.</div>
                            </details>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-16 lg:mt-20 pt-12 lg:pt-16 border-t border-deep-espresso/10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                        <div className="lg:col-span-4">
                            <h2 className="font-serif italic text-3xl sm:text-4xl text-deep-espresso mb-6 sm:mb-8">Отзывы</h2>
                            <p className="text-deep-espresso/60 text-sm leading-relaxed mb-12">Мы ценим ваше мнение о нашей продукции. Поделитесь своим опытом использования, чтобы помочь другим сделать правильный выбор.</p>
                            
                            {auth.user ? (
                                <form onSubmit={submitReview} className="space-y-6 bg-creamy-silk/30 p-5 sm:p-8 rounded-sm border border-deep-espresso/5">
                                    {flash?.success && (
                                        <div className="bg-green-50 text-green-700 p-4 text-xs uppercase tracking-widest font-bold mb-6">
                                            {flash.success}
                                        </div>
                                    )}
                                    
                                    <div>
                                        <label className="block uppercase tracking-[0.2em] text-[10px] font-bold mb-4">Ваша оценка</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setReviewData('rating', star)}
                                                    className={`transition-colors ${reviewData.rating >= star ? 'text-champagne-gold' : 'text-deep-espresso/20 hover:text-champagne-gold/50'}`}
                                                >
                                                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                    </svg>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {product.skus.length > 0 && (
                                        <div>
                                            <label className="block uppercase tracking-[0.2em] text-[10px] font-bold mb-4">Выберите оттенок</label>
                                            <select
                                                value={reviewData.sku_id}
                                                onChange={(e) => setReviewData('sku_id', e.target.value)}
                                                className="w-full bg-white border border-deep-espresso/10 p-4 text-[11px] uppercase tracking-widest font-bold focus:ring-1 focus:ring-champagne-gold focus:border-champagne-gold outline-none appearance-none cursor-pointer"
                                                style={{
                                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%233D2B1F' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'right 1rem center',
                                                    backgroundSize: '1em'
                                                }}
                                            >
                                                <option value="">Без привязки к оттенку</option>
                                                {product.skus.map((sku) => (
                                                    <option key={sku.id} value={sku.id}>
                                                        {sku.shade_name} {sku.id === selectedSku?.id ? '(текущий)' : ''}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    <div>
                                        <label className="block uppercase tracking-[0.2em] text-[10px] font-bold mb-4">Ваш отзыв</label>
                                        <textarea
                                            value={reviewData.comment}
                                            onChange={(e) => setReviewData('comment', e.target.value)}
                                            className="w-full bg-white border border-deep-espresso/10 p-4 text-sm focus:ring-1 focus:ring-champagne-gold focus:border-champagne-gold outline-none min-h-[120px]"
                                            placeholder="Поделитесь вашими впечатлениями..."
                                            required
                                        ></textarea>
                                        {reviewErrors.comment && <p className="text-red-500 text-[10px] mt-2 uppercase tracking-widest">{reviewErrors.comment}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processingReview}
                                        className="w-full bg-deep-espresso text-creamy-silk uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] font-bold py-4 hover:bg-black transition-all disabled:opacity-50"
                                    >
                                        {processingReview ? 'Отправка...' : 'Опубликовать'}
                                    </button>
                                </form>
                            ) : (
                                <div className="bg-creamy-silk/30 p-8 rounded-sm border border-deep-espresso/5 text-center">
                                    <p className="text-deep-espresso/60 text-sm mb-6">Только авторизованные пользователи могут оставлять отзывы.</p>
                                    <Link href={route('login')} className="inline-block bg-deep-espresso text-creamy-silk uppercase tracking-[0.3em] text-[10px] font-bold py-4 px-8 hover:bg-black transition-all">Войти</Link>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-8 space-y-12">
                            {reviews.length > 0 ? (
                                <div className="space-y-12">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="border-b border-deep-espresso/5 pb-12 last:border-0">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="font-serif italic text-xl text-deep-espresso">{review.user.name}</p>
                                                    {review.sku && (
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <div className="w-2.5 h-2.5 rounded-full shadow-inner" style={{ backgroundColor: review.sku.color_hex }}></div>
                                                            <span className="text-[10px] uppercase tracking-wider text-deep-espresso/40">Оттенок: {review.sku.shade_name}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex text-champagne-gold mt-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <svg key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'fill-none stroke-current'}`} viewBox="0 0 24 24">
                                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                            </svg>
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-deep-espresso/30">
                                                    {new Date(review.created_at).toLocaleDateString('ru-RU')}
                                                </span>
                                            </div>
                                            <p className="text-deep-espresso/70 leading-relaxed text-sm lg:text-base italic break-words overflow-hidden">"{review.comment}"</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-20">
                                    <svg className="w-12 h-12 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                    </svg>
                                    <p className="font-serif italic text-lg">Пока нет ни одного отзыва</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </BeautyLayout>
    );
}
