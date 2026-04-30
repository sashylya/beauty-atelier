import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link } from '@inertiajs/react';

export default function Success({ order }) {
    return (
        <BeautyLayout>
            <Head title="Заказ оформлен — Beauty Atelier" />
            
            <div className="max-w-3xl mx-auto px-4 py-32 text-center">
                <div className="mb-12 flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-champagne-gold/10 flex items-center justify-center text-champagne-gold animate-bounce">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>
                </div>

                <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-champagne-gold mb-6">Спасибо за доверие</p>
                <h1 className="font-serif italic text-6xl text-deep-espresso mb-8">Заказ принят</h1>
                
                <p className="text-sm text-deep-espresso/60 leading-relaxed max-w-md mx-auto mb-16">
                    Ваш заказ <span className="font-bold text-deep-espresso">№{order.id}</span> успешно оформлен. 
                    {order.status === 'paid' 
                        ? ' Оплата подтверждена. Мы уже начали подготовку вашей идеальной посылки.' 
                        : ' Ожидайте подтверждения оплаты. Мы сообщим вам, как только статус изменится.'}
                </p>

                <div className="bg-creamy-silk/20 p-12 border border-deep-espresso/5 mb-20 text-left">
                    <h3 className="uppercase tracking-[0.2em] text-[10px] font-bold mb-8 border-b border-deep-espresso/10 pb-4">Детали заказа</h3>
                    <div className="space-y-4 mb-8">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-xs">
                                <span className="opacity-60">{item.sku.product.name} ({item.sku.shade_name}) x {item.quantity}</span>
                                <span>{(item.price * item.quantity).toLocaleString()} ₽</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between items-baseline pt-4 border-t border-deep-espresso/10">
                        <span className="uppercase tracking-widest text-[10px] font-bold">Итого</span>
                        <span className="text-2xl font-light">{parseFloat(order.total_amount).toLocaleString()} ₽</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link 
                        href={route('dashboard')} 
                        className="bg-deep-espresso text-creamy-silk uppercase tracking-[0.3em] text-[10px] font-bold px-12 py-5 hover:bg-black transition-all"
                    >
                        В личный кабинет
                    </Link>
                    <Link 
                        href={route('catalog.index')} 
                        className="border border-deep-espresso text-deep-espresso uppercase tracking-[0.3em] text-[10px] font-bold px-12 py-5 hover:bg-creamy-silk transition-all"
                    >
                        К коллекции
                    </Link>
                </div>
            </div>
        </BeautyLayout>
    );
}
