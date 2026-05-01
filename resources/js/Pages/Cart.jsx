import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Cart({ items, subtotal, total, deliveryFee, isDeliveryFree, deliveryThreshold }) {
    const { post } = useForm();

    const removeItem = (skuId) => {
        if (confirm('Удалить этот товар из корзины?')) {
            post(route('cart.remove', skuId));
        }
    };

    const updateQuantity = (skuId, newQuantity) => {
        if (newQuantity < 1) return;
        router.patch(route('cart.update', skuId), { quantity: newQuantity }, { preserveScroll: true });
    };

    const remainingForFree = deliveryThreshold - subtotal;

    return (
        <BeautyLayout>
            <Head title="Ваш выбор — Beauty Atelier" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <header className="mb-20 text-center">
                    <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-champagne-gold mb-6">Корзина Ателье</p>
                    <h1 className="font-serif italic text-6xl text-deep-espresso">Ваш выбор</h1>
                </header>

                {items.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                        <div className="lg:col-span-8 space-y-12">
                            {items.map((item) => (
                                <div key={item.sku.id} className="flex gap-8 pb-12 border-b border-deep-espresso/5">
                                    <Link href={route('catalog.show', item.sku.product.slug)} className="block w-32 h-40 flex-shrink-0">
                                        <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden border border-deep-espresso/5 transition-transform hover:scale-105 duration-500">
                                            {item.sku.image_url ? (
                                                <img src={`/storage/${item.sku.image_url}`} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <img src={`/storage/${item.sku.product.image_path}`} alt="" className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                    </Link>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <Link href={route('catalog.show', item.sku.product.slug)} className="block group">
                                                    <h3 className="uppercase tracking-[0.2em] text-xs font-bold mb-2 group-hover:text-champagne-gold transition-colors">{item.sku.product.name}</h3>
                                                </Link>
                                                <p className="font-serif italic text-sm text-deep-espresso/60">{item.sku.shade_name}</p>
                                                {item.sku.stock <= 0 && (
                                                    <p className="text-[10px] uppercase tracking-widest font-bold text-red-800 mt-2">Нет в наличии</p>
                                                )}
                                            </div>
                                            <span className="font-light">{(item.sku.price * item.quantity).toLocaleString()} ₽</span>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center border border-deep-espresso/10 p-1 bg-white">
                                                <button onClick={() => updateQuantity(item.sku.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-creamy-silk" disabled={item.quantity <= 1}>—</button>
                                                <span className="w-10 text-center text-xs font-bold">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.sku.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-creamy-silk">+</button>
                                            </div>
                                            <button onClick={() => removeItem(item.sku.id)} className="uppercase tracking-[0.2em] text-[9px] font-bold text-red-800/40 hover:text-red-800 transition pb-1 border-b border-transparent hover:border-red-800/20">Удалить</button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {!isDeliveryFree && (
                                <div className="p-6 bg-[#FDF5E6] border border-[#D4AF37]/20 flex items-center justify-between">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B5A2B]">
                                        Добавьте еще на <span className="font-bold">{remainingForFree.toLocaleString()} ₽</span> для бесплатной доставки
                                    </p>
                                    <Link href={route('catalog.index')} className="text-[9px] font-black uppercase tracking-widest border-b border-[#8B5A2B] pb-1">В каталог</Link>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-4 bg-white p-12 shadow-sm border border-deep-espresso/5 self-start">
                            <h3 className="font-serif italic text-2xl mb-8">Сумма заказа</h3>
                            <div className="space-y-6 mb-12">
                                <div className="flex justify-between text-sm">
                                    <span className="uppercase tracking-widest opacity-60">Подытог</span>
                                    <span>{subtotal.toLocaleString()} ₽</span>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm items-center">
                                        <span className="uppercase tracking-widest opacity-60">Доставка</span>
                                        <span className={isDeliveryFree ? "text-champagne-gold font-bold text-[10px] uppercase tracking-wider" : "text-deep-espresso/60"}>
                                            {isDeliveryFree ? "Бесплатно" : `${deliveryFee.toLocaleString()} ₽`}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="pt-6 border-t border-deep-espresso/10 flex justify-between items-baseline">
                                    <span className="uppercase tracking-[0.2em] text-xs font-bold">Итого</span>
                                    <span className="text-3xl font-light">{total.toLocaleString()} ₽</span>
                                </div>
                            </div>
                            <Link 
                                href={items.some(item => item.sku.stock <= 0) ? '#' : route('checkout.index')}
                                className={`block w-full py-6 uppercase tracking-[0.4em] text-[11px] font-bold transition-all duration-500 shadow-xl text-center ${
                                    items.some(item => item.sku.stock <= 0) 
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                    : 'bg-deep-espresso text-creamy-silk hover:bg-black'
                                }`}
                                onClick={(e) => items.some(item => item.sku.stock <= 0) && e.preventDefault()}
                            >
                                {items.some(item => item.sku.stock <= 0) ? 'Удалите отсутствующие товары' : 'Перейти к оформлению'}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-40">
                        <p className="font-serif italic text-2xl text-deep-espresso/40 tracking-widest mb-12">Ваша корзина пока пуста.</p>
                        <Link href={route('catalog.index')} className="bg-deep-espresso text-creamy-silk uppercase tracking-[0.4em] text-[10px] font-bold px-12 py-6 hover:bg-champagne-gold transition-all duration-500 shadow-2xl">Вернуться к коллекции</Link>
                    </div>
                )}
            </div>
        </BeautyLayout>
    );
}