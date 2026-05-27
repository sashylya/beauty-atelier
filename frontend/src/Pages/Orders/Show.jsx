import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ order }) {
    const statusLabels = {
        'new': 'Ожидает оплаты',
        'paid': 'Оплачено',
        'packed': 'Собран',
        'shipped': 'Отправлено',
        'completed': 'Завершен',
        'cancelled': 'Отменен'
    };

    return (
        <BeautyLayout>
            <Head title={`Заказ №${order.id} — Beauty Atelier`} />
            
            <div className="max-w-4xl mx-auto px-4 py-20">
                <div className="mb-12">
                    <Link href={route('dashboard')} className="text-[10px] uppercase tracking-widest font-bold text-deep-espresso/40 hover:text-deep-espresso mb-8 block transition-colors">← В личный кабинет</Link>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-champagne-gold mb-4">История заказов</p>
                            <h1 className="font-serif italic text-5xl text-deep-espresso">Заказ №{order.id}</h1>
                        </div>
                        <div className="text-right">
                            <span className={`inline-block px-4 py-2 text-[10px] uppercase tracking-widest font-bold ${
                                order.status === 'paid' ? 'bg-green-50 text-green-800' : 
                                order.status === 'cancelled' ? 'bg-red-50 text-red-800' : 'bg-creamy-silk text-deep-espresso/60'
                            }`}>
                                {statusLabels[order.status] || order.status}
                            </span>
                            <p className="text-[10px] uppercase tracking-widest opacity-40 mt-3 font-bold">
                                от {new Date(order.created_at).toLocaleDateString('ru-RU')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white border border-deep-espresso/5 shadow-sm overflow-hidden">
                            <div className="p-8 border-b border-deep-espresso/5 bg-[#FAF9F6]">
                                <h3 className="uppercase tracking-widest text-[10px] font-bold">Состав заказа</h3>
                            </div>
                            <div className="divide-y divide-deep-espresso/5">
                                {order.items.map((item) => (
                                    <div key={item.id} className="p-8 flex items-center gap-8">
                                        <div className="w-24 h-24 bg-[#F0F0F0] flex-shrink-0">
                                            {item.sku.product.image_path ? (
                                                <img src={`/storage/${item.sku.product.image_path}`} alt={item.sku.product.name} className="w-full h-full object-contain p-2" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] opacity-20 uppercase font-bold tracking-widest">Нет фото</div>
                                            )}
                                        </div>
                                        <div className="flex-grow">
                                            <Link href={route('catalog.show', item.sku.product.slug)} className="font-serif italic text-xl hover:text-champagne-gold transition-colors block mb-2">
                                                {item.sku.product.name}
                                            </Link>
                                            <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 font-bold">{item.sku.shade_name}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-serif italic mb-1">{parseFloat(item.price).toLocaleString()} ₽</p>
                                            <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Кол-во: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-white p-8 border border-deep-espresso/5 shadow-sm">
                            <h3 className="uppercase tracking-widest text-[10px] font-bold mb-8 border-b border-deep-espresso/5 pb-4">Итого по заказу</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-xs">
                                    <span className="opacity-40 uppercase tracking-widest font-bold">Сумма товаров</span>
                                    <span>{(parseFloat(order.total_amount) - (parseFloat(order.total_amount) >= 2000 ? 0 : 200)).toLocaleString()} ₽</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span className="opacity-40 uppercase tracking-widest font-bold">Доставка</span>
                                    <span>{parseFloat(order.total_amount) >= 2000 ? 'Бесплатно' : '200 ₽'}</span>
                                </div>
                            </div>
                            <div className="flex justify-between items-end pt-6 border-t border-deep-espresso/10">
                                <span className="uppercase tracking-widest text-[10px] font-bold">Итого</span>
                                <span className="text-3xl font-serif italic text-deep-espresso">{parseFloat(order.total_amount).toLocaleString()} ₽</span>
                            </div>
                        </div>

                        <div className="bg-creamy-silk/10 p-8 border border-deep-espresso/5">
                            <h3 className="uppercase tracking-widest text-[10px] font-bold mb-6 opacity-40">Адрес доставки</h3>
                            <p className="text-sm font-light leading-relaxed text-deep-espresso">
                                {order.shipping_address}
                            </p>
                        </div>

                        {order.status === 'new' && (
                            <Link 
                                href={route('orders.pay', order.id)}
                                method="post"
                                as="button"
                                className="w-full bg-deep-espresso text-creamy-silk py-6 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all shadow-xl"
                            >
                                Перейти к оплате
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </BeautyLayout>
    );
}
