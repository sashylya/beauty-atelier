import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ favoriteSkus }) {
    const removeFavorite = (productId, skuId) => {
        router.post(route('wishlist.toggle', productId), { sku_id: skuId }, { preserveScroll: true });
    };

    return (
        <BeautyLayout>
            <Head title="Избранное — Beauty Atelier" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <header className="mb-20">
                    <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-champagne-gold mb-4">Ваш выбор</p>
                    <h1 className="font-serif italic text-6xl text-deep-espresso">Избранное</h1>
                </header>

                {favoriteSkus && favoriteSkus.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                        {favoriteSkus.map((sku) => (
                            <div key={sku.id} className="group relative">
                                <Link href={route('catalog.show', sku.product.slug)}>
                                    <div className="aspect-[4/5] overflow-hidden bg-[#F0F0F0] mb-6 relative border border-deep-espresso/5 shadow-sm">
                                        <div className="w-full h-full flex items-center justify-center transition-transform duration-1000 ease-out group-hover:scale-110">
                                            {sku.image_url ? (
                                                <img 
                                                    src={`/storage/${sku.image_url}`} 
                                                    alt={sku.shade_name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                sku.product.image_path ? (
                                                    <img 
                                                        src={`/storage/${sku.product.image_path}`} 
                                                        alt={sku.product.name} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="font-serif italic text-neutral-300 text-2xl uppercase tracking-widest">{sku.product.category}</span>
                                                )
                                            )}
                                        </div>
                                        <button 
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                removeFavorite(sku.product_id, sku.id);
                                            }}
                                            className="absolute top-6 right-6 z-20 bg-white/80 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center text-red-800 hover:bg-red-800 hover:text-white transition-all shadow-sm"
                                        >
                                            ✕
                                        </button>
                                        <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 border border-deep-espresso/5 shadow-sm">
                                            <div className="w-3 h-3 rounded-full shadow-inner" style={{ backgroundColor: sku.color_hex }}></div>
                                            <span className="text-[8px] uppercase tracking-widest font-bold">{sku.shade_name}</span>
                                        </div>
                                    </div>
                                    <div className="text-center px-4">
                                        <h3 className="uppercase tracking-[0.2em] text-[11px] font-bold mb-2 group-hover:text-champagne-gold transition-colors duration-300">{sku.product.name}</h3>
                                        <p className="uppercase tracking-[0.1em] text-xs font-semibold mb-4">
                                            {parseFloat(sku.price || sku.product.price).toLocaleString()} ₽
                                        </p>
                                    </div>
                                </Link>
                                <div className="px-4">
                                    <Link 
                                        href={route('catalog.show', sku.product.slug)}
                                        className="block w-full py-3 bg-deep-espresso text-creamy-silk text-[10px] uppercase tracking-widest font-bold text-center hover:bg-black transition-all"
                                    >
                                        Купить этот оттенок
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-40 text-center">
                        <p className="font-serif italic text-2xl text-deep-espresso/40 tracking-widest text-center">В списке пока пусто</p>
                        <Link 
                            href={route('catalog.index')}
                            className="mt-8 inline-block uppercase tracking-[0.2em] text-[10px] font-bold border-b border-deep-espresso pb-1 text-deep-espresso hover:text-champagne-gold transition-colors"
                        >
                            Перейти в каталог
                        </Link>
                    </div>
                )}
            </div>
        </BeautyLayout>
    );
}
