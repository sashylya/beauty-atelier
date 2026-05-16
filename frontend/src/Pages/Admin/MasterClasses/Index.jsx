import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Index({ masterClasses, bookings }) {
    const { delete: destroy } = useForm();

    const handleDeleteMC = (id) => {
        if (confirm('Вы уверены, что хотите удалить этот мастер-класс?')) {
            destroy(route('admin.master-classes.destroy', id));
        }
    };

    const handleStatusChange = (id, status) => {
        router.patch(route('admin.bookings.update', id), { status });
    };

    const handleDeleteBooking = (id) => {
        if (confirm('Вы уверены, что хотите удалить эту запись?')) {
            destroy(route('admin.bookings.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Мастер-классы и Записи" />
            
            {/* Section: Master Classes */}
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h1 className="font-serif text-4xl italic text-[#3D2B1F]">Мастер-классы</h1>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#3D2B1F]/40 mt-4">Управление расписанием и программой</p>
                </div>
                <Link
                    href={route('admin.master-classes.create')}
                    className="inline-block border border-[#3D2B1F] text-[#3D2B1F] uppercase tracking-[0.2em] text-[10px] font-bold px-8 py-3 hover:bg-[#3D2B1F] hover:text-white transition-all duration-300"
                >
                    Добавить МК
                </Link>
            </div>

            <div className="bg-white shadow-sm border border-[#3D2B1F]/5 overflow-hidden mb-20">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="border-b border-[#3D2B1F]/10">
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60">Название</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60">Дата и время</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Места</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Цена</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3D2B1F]/5">
                        {masterClasses.map((mc) => (
                            <tr key={mc.id} className="hover:bg-[#FDF5E6]/30 transition-colors group">
                                <td className="py-4 px-6 font-medium text-[#3D2B1F] text-sm">
                                    {mc.title}
                                </td>
                                <td className="py-4 px-6 text-[#3D2B1F]/80 text-sm">
                                    {new Date(mc.date_time).toLocaleString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                                </td>
                                <td className="py-4 px-6 text-center text-[#3D2B1F]/80 text-sm font-serif italic">
                                    {mc.capacity}
                                </td>
                                <td className="py-4 px-6 text-center font-serif italic text-[#3D2B1F]">
                                    {Number(mc.price).toLocaleString()} ₽
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <div className="flex item-center justify-center gap-4 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <Link href={route('admin.master-classes.edit', mc.id)} className="text-[#3D2B1F] hover:text-[#8B5A2B] transition-colors" title="Редактировать">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </Link>
                                        <button onClick={() => handleDeleteMC(mc.id)} className="text-[#3D2B1F] hover:text-red-500 transition-colors" title="Удалить">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Section: Bookings */}
            <div className="mb-12">
                <h2 className="font-serif text-3xl italic text-[#3D2B1F]">Последние записи</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#3D2B1F]/40 mt-4">Список всех клиентов, забронировавших места</p>
            </div>

            <div className="bg-white shadow-sm border border-[#3D2B1F]/5 overflow-hidden">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="border-b border-[#3D2B1F]/10">
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 w-32">Дата записи</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60">Клиент</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60">Мастер-класс</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Гостей</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Сумма</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Статус</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center w-24">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3D2B1F]/5">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-[#FDF5E6]/30 transition-colors group">
                                <td className="py-4 px-6 text-[#3D2B1F]/80 text-[11px] font-serif">
                                    {new Date(booking.created_at).toLocaleDateString('ru-RU')}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="text-sm font-medium text-[#3D2B1F]">{booking.user?.name}</div>
                                    <div className="text-[9px] text-[#3D2B1F]/40 lowercase tracking-wider font-medium">{booking.user?.email}</div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="text-sm text-[#3D2B1F]">{booking.master_class?.title}</div>
                                    <div className="text-[9px] text-champagne-gold uppercase tracking-widest mt-1 font-bold">
                                        {new Date(booking.master_class?.date_time).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-center text-[#3D2B1F] font-serif italic text-lg">
                                    {booking.tickets_count}
                                </td>
                                <td className="py-4 px-6 text-center font-serif italic text-[#3D2B1F] text-lg">
                                    {(Number(booking.tickets_count) * Number(booking.master_class?.price || 0)).toLocaleString()} ₽
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <select 
                                        value={booking.status}
                                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                                        className={`text-[9px] uppercase tracking-widest font-bold border-0 bg-transparent focus:ring-0 cursor-pointer ${
                                            booking.status === 'paid' ? 'text-green-600' : 
                                            booking.status === 'cancelled' ? 'text-red-500' :
                                            booking.status === 'confirmed' ? 'text-blue-500' : 'text-orange-400'
                                        }`}
                                    >
                                        <option value="pending">Ожидает оплаты</option>
                                        <option value="paid">Оплачено</option>
                                        <option value="confirmed">Подтверждено</option>
                                        <option value="cancelled">Отменено</option>
                                    </select>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <button 
                                        onClick={() => handleDeleteBooking(booking.id)} 
                                        className="text-[#3D2B1F] hover:text-red-500 transition-colors opacity-40 group-hover:opacity-100" 
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5 mx-auto">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {bookings.length === 0 && (
                            <tr>
                                <td colSpan="7" className="py-20 text-center text-[#3D2B1F]/30 italic font-serif">
                                    Записей на мастер-классы пока нет
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </AdminLayout>
    );
}