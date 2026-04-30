import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Index({ items, total, subtotal, packagingPrice }) {
    const { data, setData, post, processing, errors } = useForm({
        shipping_address: '',
        is_gift: false,
        gift_message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    return (
        <BeautyLayout>
            <Head title="Оформление заказа — Beauty Atelier" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <header className="mb-20 text-center">
                    <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-champagne-gold mb-6">Завершение образа</p>
                    <h1 className="font-serif italic text-6xl text-deep-espresso">Оформление</h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-7">
                        <form onSubmit={submit} className="space-y-12">
                            <section>
                                <h3 className="uppercase tracking-[0.2em] text-xs font-bold mb-8 pb-4 border-b border-deep-espresso/5">Адрес доставки</h3>
                                <div>
                                    <textarea
                                        value={data.shipping_address}
                                        onChange={e => setData('shipping_address', e.target.value)}
                                        className="w-full bg-creamy-silk/30 border-deep-espresso/10 focus:border-champagne-gold focus:ring-0 p-6 min-h-[120px] text-sm placeholder:text-deep-espresso/20"
                                        placeholder="Город, улица, дом, квартира..."
                                    ></textarea>
                                    {errors.shipping_address && <div className="text-red-800 text-[10px] mt-2 uppercase tracking-widest">{errors.shipping_address}</div>}
                                </div>
                            </section>

                            <section>
                                <h3 className="uppercase tracking-[0.2em] text-xs font-bold mb-8 pb-4 border-b border-deep-espresso/5">Подарочная опция</h3>
                                <div className="space-y-6">
                                    <label className="flex items-center gap-4 cursor-pointer group">
                                        <input 
                                            type="checkbox" 
                                            checked={data.is_gift}
                                            onChange={e => setData('is_gift', e.target.checked)}
                                            className="w-5 h-5 border-deep-espresso/10 text-deep-espresso focus:ring-0 rounded-sm"
                                        />
                                        <span className="text-[11px] uppercase tracking-[0.1em] font-medium text-deep-espresso/60 group-hover:text-deep-espresso transition-colors">Это подарок для другого человека</span>
                                    </label>

                                    {data.is_gift && (
                                        <div className="animate-fade-in">
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-deep-espresso/40 mb-4 font-bold">Ваше послание</p>
                                            <textarea
                                                value={data.gift_message}
                                                onChange={e => setData('gift_message', e.target.value)}
                                                className="w-full bg-creamy-silk/30 border-deep-espresso/10 focus:border-champagne-gold focus:ring-0 p-6 min-h-[100px] text-sm placeholder:text-deep-espresso/20"
                                                placeholder="Напишите несколько теплых слов..."
                                            ></textarea>
                                        </div>
                                    )}
                                </div>
                            </section>

                            <div className="pt-12">
                                <button 
                                    disabled={processing}
                                    className="w-full lg:w-auto px-20 bg-deep-espresso text-creamy-silk uppercase tracking-[0.4em] text-[11px] font-bold py-6 hover:bg-black transition-all duration-500 shadow-2xl disabled:opacity-50"
                                >
                                    {processing ? 'Обработка...' : 'Перейти к оплате'}
                                </button>
                                <p className="mt-6 text-[9px] text-deep-espresso/30 uppercase tracking-widest text-center lg:text-left">
                                    Нажимая кнопку, вы соглашаетесь с условиями оферты
                                </p>
                            </div>
                        </form>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="bg-white p-12 border border-deep-espresso/5 sticky top-40">
                            <h3 className="font-serif italic text-2xl mb-10">Ваш заказ</h3>
                            <div className="space-y-8 mb-12">
                                {items.map((item) => (
                                    <div key={item.sku.id} className="flex gap-4 items-center">
                                        <div className="w-16 h-20 bg-creamy-silk/20 flex-shrink-0">
                                            <img 
                                                src={item.sku.image_url ? `/storage/${item.sku.image_url}` : `/storage/${item.sku.product.image_path}`} 
                                                alt="" 
                                                className="w-full h-full object-cover" 
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[9px] uppercase font-bold truncate tracking-wider">{item.sku.product.name}</p>
                                            <p className="font-serif italic text-[11px] text-deep-espresso/60">{item.sku.shade_name}</p>
                                            <p className="text-[10px] mt-1 font-medium">{item.quantity} x {parseFloat(item.sku.price).toLocaleString()} ₽</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-8 border-t border-deep-espresso/10 mb-8">
                                <div className="flex justify-between text-[11px] uppercase tracking-widest">
                                    <span className="opacity-40">Подытог</span>
                                    <span>{subtotal.toLocaleString()} ₽</span>
                                </div>
                                <div className="flex justify-between text-[11px] uppercase tracking-widest">
                                    <span className="opacity-40">Упаковка</span>
                                    <span>{packagingPrice > 0 ? `${packagingPrice.toLocaleString()} ₽` : 'Бесплатно'}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-baseline pt-4">
                                <span className="uppercase tracking-[0.3em] text-xs font-bold">Итого</span>
                                <span className="text-4xl font-light">{total.toLocaleString()} ₽</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BeautyLayout>
    );
}
