import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Index({ items, total, subtotal, deliveryFee, isDeliveryFree }) {
    const { data, setData, post, processing, errors } = useForm({
        city: '',
        street: '',
        house: '',
        apartment: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    return (
        <BeautyLayout>
            <Head title="Оформление заказа — Beauty Atelier" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-32">
                <header className="mb-12 lg:mb-20 text-center">
                    <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-champagne-gold mb-6">Завершение образа</p>
                    <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-6xl text-deep-espresso">Оформление</h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    <div className="lg:col-span-7">
                        <form onSubmit={submit} className="space-y-10 lg:space-y-12">
                            <section>
                                <h3 className="uppercase tracking-[0.2em] text-xs font-bold mb-8 pb-4 border-b border-deep-espresso/5">Адрес доставки</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="text-[10px] uppercase tracking-widest text-deep-espresso/40 font-bold mb-2 block">Город *</label>
                                        <input
                                            type="text"
                                            value={data.city}
                                            onChange={e => setData('city', e.target.value)}
                                            className="w-full bg-creamy-silk/30 border-deep-espresso/10 focus:border-champagne-gold focus:ring-0 p-4 text-sm"
                                            placeholder="Например: Москва"
                                            required
                                        />
                                        {errors.city && <div className="text-red-800 text-[10px] mt-2 uppercase tracking-widest">{errors.city}</div>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-[10px] uppercase tracking-widest text-deep-espresso/40 font-bold mb-2 block">Улица *</label>
                                        <input
                                            type="text"
                                            value={data.street}
                                            onChange={e => setData('street', e.target.value)}
                                            className="w-full bg-creamy-silk/30 border-deep-espresso/10 focus:border-champagne-gold focus:ring-0 p-4 text-sm"
                                            placeholder="Например: Арбат"
                                            required
                                        />
                                        {errors.street && <div className="text-red-800 text-[10px] mt-2 uppercase tracking-widest">{errors.street}</div>}
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-deep-espresso/40 font-bold mb-2 block">Дом / Корпус *</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={data.house}
                                            onChange={e => setData('house', e.target.value.replace(/\D/g, ''))}
                                            className="w-full bg-creamy-silk/30 border-deep-espresso/10 focus:border-champagne-gold focus:ring-0 p-4 text-sm"
                                            placeholder="Например: 10"
                                            required
                                        />
                                        {errors.house && <div className="text-red-800 text-[10px] mt-2 uppercase tracking-widest">{errors.house}</div>}
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-deep-espresso/40 font-bold mb-2 block">Квартира / Офис *</label>
                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            value={data.apartment}
                                            onChange={e => setData('apartment', e.target.value.replace(/\D/g, ''))}
                                            className="w-full bg-creamy-silk/30 border-deep-espresso/10 focus:border-champagne-gold focus:ring-0 p-4 text-sm"
                                            placeholder="Например: 5"
                                            required
                                        />
                                        {errors.apartment && <div className="text-red-800 text-[10px] mt-2 uppercase tracking-widest">{errors.apartment}</div>}
                                    </div>
                                </div>
                            </section>

                            <div className="pt-8 lg:pt-12">
                                <button
                                    disabled={processing}
                                    className="w-full lg:w-auto lg:px-20 bg-deep-espresso text-creamy-silk uppercase tracking-[0.24em] sm:tracking-[0.4em] text-[10px] sm:text-[11px] font-bold py-5 sm:py-6 hover:bg-black transition-all duration-500 shadow-2xl disabled:opacity-50"
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
                        <div className="bg-white p-6 sm:p-8 lg:p-12 border border-deep-espresso/5 lg:sticky lg:top-40">
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
                                    <span className="opacity-40">Сумма</span>
                                    <span>{subtotal.toLocaleString()} ₽</span>
                                </div>
                                <div className="flex justify-between text-[11px] uppercase tracking-widest">
                                    <span className="opacity-40">Доставка</span>
                                    <span className={isDeliveryFree ? "text-champagne-gold font-bold" : ""}>
                                        {isDeliveryFree ? 'Бесплатно' : `${deliveryFee.toLocaleString()} ₽`}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-baseline pt-4">
                                <span className="uppercase tracking-[0.3em] text-xs font-bold">Итого</span>
                                <span className="text-3xl sm:text-4xl font-light">{total.toLocaleString()} ₽</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BeautyLayout>
    );
}
