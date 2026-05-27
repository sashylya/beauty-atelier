import React, { useEffect, useState } from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ auth, orders, bookings }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('bookings');

    useEffect(() => {
        if (flash.error) {
            alert(flash.error);
        }
    }, [flash.error]);

    const sortedBookings = [...bookings].sort((a, b) => {
        const dateA = new Date(a.master_class.date_time);
        const dateB = new Date(b.master_class.date_time);
        const now = new Date();
        const isPassedA = dateA < now;
        const isPassedB = dateB < now;

        if (isPassedA !== isPassedB) {
            return isPassedA ? 1 : -1;
        }
        
        return isPassedA ? dateB - dateA : dateA - dateB;
    });

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

                {/* Tabs Navigation */}
                <div className="flex gap-12 mb-16 border-b border-deep-espresso/5">
                    <button 
                        onClick={() => setActiveTab('bookings')}
                        className={`pb-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative ${
                            activeTab === 'bookings' ? 'text-deep-espresso' : 'text-deep-espresso/40 hover:text-deep-espresso'
                        }`}
                    >
                        Мои Мастер-классы
                        <span className="ml-2 opacity-40">({bookings.length})</span>
                        {activeTab === 'bookings' && <div className="absolute bottom-[-1px] left-0 w-full h-[1px] bg-deep-espresso"></div>}
                    </button>
                    <button 
                        onClick={() => setActiveTab('orders')}
                        className={`pb-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative ${
                            activeTab === 'orders' ? 'text-deep-espresso' : 'text-deep-espresso/40 hover:text-deep-espresso'
                        }`}
                    >
                        История Заказов
                        <span className="ml-2 opacity-40">({orders.length})</span>
                        {activeTab === 'orders' && <div className="absolute bottom-[-1px] left-0 w-full h-[1px] bg-deep-espresso"></div>}
                    </button>
                </div>

                <div className="max-w-3xl">
                    {activeTab === 'bookings' ? (
                        /* Active Bookings Section */
                        <div className="space-y-8">
                            {bookings.length > 0 ? (
                                <div className="flex flex-col gap-6">
                                    {sortedBookings.map((booking) => (
                                        <div key={booking.id} className="bg-white p-8 shadow-sm border border-deep-espresso/5 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-16 h-16 bg-creamy-silk -rotate-45 translate-x-8 -translate-y-8"></div>

                                            <div className="flex justify-between items-start mb-6 relative z-10">
                                                <div>
                                                    <p className="uppercase tracking-[0.2em] text-[9px] font-bold text-champagne-gold mb-2">
                                                        {new Date(booking.master_class.date_time).toLocaleDateString('ru-RU')}
                                                    </p>
                                                    <Link href={route('master-classes.show', booking.master_class.id)} className="font-serif italic text-xl hover:text-champagne-gold transition-colors">
                                                        {booking.master_class.title}
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-end border-t border-deep-espresso/5 pt-6">
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Локация</p>
                                                    <p className="font-serif italic text-sm">{booking.master_class.location}</p>
                                                    <div className="mt-4 flex gap-4">
                                                        {(booking.status === 'paid' || booking.status === 'confirmed') && (
                                                            <Link 
                                                                href={route('bookings.ticket', booking.id)} 
                                                                className="text-[9px] uppercase tracking-widest font-bold text-champagne-gold border-b border-champagne-gold hover:opacity-70 transition"
                                                            >
                                                                Показать билет
                                                            </Link>
                                                        )}
                                                        {booking.status === 'pending' && new Date(booking.master_class.date_time) > new Date() && (
                                                            <>
                                                                <Link 
                                                                    href={route('bookings.pay', booking.id)} 
                                                                    method="post"
                                                                    as="button"
                                                                    className="text-[9px] uppercase tracking-widest font-bold text-champagne-gold border-b border-champagne-gold hover:opacity-70 transition"
                                                                >
                                                                    Оплатить
                                                                </Link>
                                                                <Link 
                                                                    href={route('bookings.cancel', booking.id)} 
                                                                    method="post"
                                                                    as="button"
                                                                    onBefore={() => confirm('Отменить бронирование?')}
                                                                    className="text-[9px] uppercase tracking-widest font-bold text-red-800/40 hover:text-red-800 transition"
                                                                >
                                                                    Отменить
                                                                </Link>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className={`inline-block px-3 py-1 text-[9px] uppercase tracking-widest font-bold ${
                                                    new Date(booking.master_class.date_time) < new Date() ? 'bg-gray-100 text-gray-500' :
                                                    booking.status === 'paid' ? 'bg-green-50 text-green-800' : 
                                                    booking.status === 'confirmed' ? 'bg-blue-50 text-blue-800' : 
                                                    booking.status === 'cancelled' ? 'bg-red-50 text-red-800' : 
                                                    'bg-creamy-silk text-deep-espresso/60'
                                                }`}>
                                                    {new Date(booking.master_class.date_time) < new Date() ? 'Завершен' : (
                                                        booking.status === 'pending' ? 'Ожидает оплаты' : 
                                                        booking.status === 'paid' ? 'Оплачено' : 
                                                        booking.status === 'confirmed' ? 'Подтверждено' : 
                                                        booking.status === 'cancelled' ? 'Отменено' : booking.status
                                                    )}
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
                    ) : (
                        /* Order History Section */
                        <div className="space-y-8">
                            {orders.length > 0 ? (
                                <div className="flex flex-col gap-6">
                                    {orders.map((order) => (
                                        <div key={order.id} className="bg-white p-8 shadow-sm border border-deep-espresso/5 flex flex-col">
                                            <div className="flex justify-between items-center mb-6 border-b border-deep-espresso/5 pb-4">
                                                <div>
                                                    <span className="uppercase tracking-[0.2em] text-[10px] font-bold mr-4">Заказ #{order.id}</span>
                                                    <span className="text-xs text-deep-espresso/40">{new Date(order.created_at).toLocaleDateString('ru-RU')}</span>
                                                </div>
                                                <span className={`text-[10px] uppercase tracking-widest font-bold ${
                                                    order.status === 'paid' ? 'text-green-600' : 
                                                    order.status === 'cancelled' ? 'text-red-400' : 'text-deep-espresso/60'
                                                }`}>
                                                    {order.status === 'new' ? 'Ожидает оплаты' : 
                                                     order.status === 'paid' ? 'Оплачено' : 
                                                     order.status === 'packed' ? 'Собран' : 
                                                     order.status === 'shipped' ? 'Отправлено' : 
                                                     order.status === 'completed' ? 'Завершено' : 
                                                     order.status === 'cancelled' ? 'Отменено' : order.status}
                                                </span>
                                            </div>

                                            <div className="space-y-4 mb-6 flex-grow">
                                                {order.items.slice(0, 2).map((item) => (
                                                    <div key={item.id} className="flex justify-between items-center">
                                                        <Link href={route('catalog.show', item.sku.product.slug)} className="flex items-center gap-4 group">
                                                            <div className="w-10 h-10 bg-[#F0F0F0] overflow-hidden flex-shrink-0">
                                                                {item.sku.product.image_path ? (
                                                                    <img src={`/storage/${item.sku.product.image_path}`} alt={item.sku.product.name} className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-[6px] opacity-20 uppercase font-bold tracking-widest">Нет фото</div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-serif italic group-hover:text-champagne-gold transition-colors">{item.sku.product.name}</p>
                                                                <p className="text-[10px] uppercase tracking-widest opacity-40">{item.sku.shade_name}</p>
                                                            </div>
                                                        </Link>
                                                        <span className="text-xs opacity-60">x{item.quantity}</span>
                                                    </div>
                                                ))}

                                                {order.items.length > 2 && (
                                                    <Link 
                                                        href={route('orders.show', order.id)}
                                                        className="block py-2 text-center text-[10px] uppercase tracking-widest font-bold text-champagne-gold hover:opacity-70 transition-opacity bg-champagne-gold/5"
                                                    >
                                                        И еще {order.items.length - 2} {order.items.length - 2 === 1 ? 'товар' : 'товара'} ...
                                                    </Link>
                                                )}
                                            </div>

                                            <div className="flex justify-between items-center pt-4 border-t border-deep-espresso/5 mt-auto">
                                                <div className="flex gap-6 items-center">
                                                    <Link 
                                                        href={route('orders.show', order.id)}
                                                        className="text-[9px] uppercase tracking-[0.2em] font-bold border-b border-deep-espresso/20 hover:border-deep-espresso transition"
                                                    >
                                                        Детали
                                                    </Link>
                                                    {(order.status === 'new' || order.status === 'paid') && (
                                                        <Link 
                                                            href={route('orders.cancel', order.id)} 
                                                            method="post"
                                                            as="button"
                                                            onBefore={() => confirm(order.status === 'paid' ? 'Вы уверены? Заказ оплачен, средства будут возвращены на карту.' : 'Вы уверены, что хотите отменить этот заказ? Товары вернутся в каталог.')}
                                                            className="text-[9px] uppercase tracking-[0.2em] font-bold text-red-800/40 hover:text-red-800 transition"
                                                        >
                                                            Отменить
                                                        </Link>
                                                    )}
                                                </div>
                                                <div className="text-right">
                                                    <span className="uppercase tracking-[0.2em] text-[9px] font-bold opacity-60 mr-4">Итого</span>
                                                    <span className="font-serif italic text-lg">{order.total_amount?.toLocaleString() ?? '—'} ₽</span>
                                                </div>
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
                    )}
                </div>
            </div>
        </BeautyLayout>
    );
}
