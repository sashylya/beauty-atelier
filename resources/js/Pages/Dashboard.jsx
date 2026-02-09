import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, orders, bookings }) {
    return (
        <BeautyLayout>
            <Head title="Личный Кабинет — Beauty Atelier" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-deep-espresso/10 pb-8">
                    <div>
                        <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-champagne-gold mb-6">Добро пожаловать</p>
                        <h1 className="font-serif italic text-6xl text-deep-espresso">{auth.user.name}</h1>
                    </div>
                    <div className="flex gap-6 mt-6 md:mt-0">
                        <Link 
                            href={route('profile.edit')}
                            className="uppercase tracking-[0.2em] text-[10px] font-bold border-b border-deep-espresso hover:text-champagne-gold hover:border-champagne-gold transition pb-1"
                        >
                            Настройки профиля
                        </Link>
                        <Link 
                            href={route('logout')} 
                            method="post" 
                            as="button"
                            className="uppercase tracking-[0.2em] text-[10px] font-bold text-red-900/60 hover:text-red-900 transition pb-1"
                        >
                            Выйти
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    
                    {/* Active Bookings Section */}
                    <div className="space-y-12">
                        <h2 className="font-serif italic text-3xl text-deep-espresso flex items-center gap-4">
                            Мои Мастер-классы
                            <span className="text-sm font-sans not-italic bg-deep-espresso/5 rounded-full w-6 h-6 flex items-center justify-center text-deep-espresso/60">{bookings.length}</span>
                        </h2>

                        {bookings.length > 0 ? (
                            <div className="space-y-6">
                                {bookings.map((booking) => (
                                    <div key={booking.id} className="bg-white p-8 shadow-sm border border-deep-espresso/5 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-creamy-silk -rotate-45 translate-x-8 -translate-y-8"></div>
                                        
                                        <div className="flex justify-between items-start mb-6 relative z-10">
                                            <div>
                                                <p className="uppercase tracking-[0.2em] text-[9px] font-bold text-champagne-gold mb-2">
                                                    {new Date(booking.master_class.date_time).toLocaleDateString('ru-RU')}
                                                </p>
                                                <h3 className="font-serif italic text-xl">{booking.master_class.title}</h3>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-2xl font-light">{booking.tickets_count}</span>
                                                <span className="text-[8px] uppercase tracking-widest opacity-40">Билетов</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between items-end border-t border-deep-espresso/5 pt-6">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Локация</p>
                                                <p className="font-serif italic text-sm">{booking.master_class.location}</p>
                                            </div>
                                            <span className="inline-block px-3 py-1 bg-green-50 text-green-800 text-[9px] uppercase tracking-widest font-bold">
                                                Подтверждено
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-12 text-center border border-dashed border-deep-espresso/20">
                                <p className="font-serif italic text-lg text-deep-espresso/40 mb-6">У вас пока нет запланированных визитов.</p>
                                <Link href={route('master-classes.index')} className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-deep-espresso">Записаться в Ателье</Link>
                            </div>
                        )}
                    </div>

                    {/* Order History Section */}
                    <div className="space-y-12">
                        <h2 className="font-serif italic text-3xl text-deep-espresso flex items-center gap-4">
                            История Заказов
                            <span className="text-sm font-sans not-italic bg-deep-espresso/5 rounded-full w-6 h-6 flex items-center justify-center text-deep-espresso/60">{orders.length}</span>
                        </h2>

                        {orders.length > 0 ? (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order.id} className="bg-white p-8 shadow-sm border border-deep-espresso/5">
                                        <div className="flex justify-between items-center mb-6 border-b border-deep-espresso/5 pb-4">
                                            <div>
                                                <span className="uppercase tracking-[0.2em] text-[10px] font-bold mr-4">Заказ #{order.id}</span>
                                                <span className="text-xs text-deep-espresso/40">{new Date(order.created_at).toLocaleDateString('ru-RU')}</span>
                                            </div>
                                            <span className="text-[10px] uppercase tracking-widest font-bold text-deep-espresso/60">{order.status || 'Обработка'}</span>
                                        </div>

                                        <div className="space-y-4 mb-6">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex justify-between items-center">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-8 h-8 rounded-full border border-deep-espresso/10" style={{ backgroundColor: item.sku.color_hex }}></div>
                                                        <div>
                                                            <p className="text-sm font-serif italic">{item.sku.product.name}</p>
                                                            <p className="text-[10px] uppercase tracking-widest opacity-40">{item.sku.shade_name}</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs opacity-60">x{item.quantity}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t border-deep-espresso/5">
                                            <span className="uppercase tracking-[0.2em] text-[9px] font-bold opacity-60">Итого</span>
                                            <span className="font-serif italic text-lg">{order.total_amount?.toLocaleString() ?? '—'} ₽</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-12 text-center border border-dashed border-deep-espresso/20">
                                <p className="font-serif italic text-lg text-deep-espresso/40 mb-6">Ваша коллекция еще пуста.</p>
                                <Link href={route('catalog.index')} className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-deep-espresso">Перейти в каталог</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </BeautyLayout>
    );
}