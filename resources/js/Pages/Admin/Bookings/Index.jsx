import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Index({ bookings }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Вы уверены, что хотите удалить эту запись?')) {
            destroy(route('admin.bookings.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Записи на мастер-классы" />
            
            <div className="mb-12">
                <h1 className="font-serif text-4xl italic text-[#3D2B1F]">Записи на мастер-классы</h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#3D2B1F]/40 mt-4">Управление списком гостей и бронированиями</p>
            </div>

            <div className="bg-white shadow-sm border border-[#3D2B1F]/5 overflow-hidden">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="border-b border-[#3D2B1F]/10">
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60">Дата записи</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60">Клиент</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60">Мастер-класс</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Гостей</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Сумма</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3D2B1F]/5">
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-[#FDF5E6]/30 transition-colors group">
                                <td className="py-4 px-6 text-[#3D2B1F]/80 text-sm">
                                    {new Date(booking.created_at).toLocaleDateString('ru-RU')}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="text-sm font-medium text-[#3D2B1F]">{booking.user?.name}</div>
                                    <div className="text-[10px] text-[#3D2B1F]/40 lowercase tracking-wider">{booking.user?.email}</div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="text-sm text-[#3D2B1F]">{booking.master_class?.title}</div>
                                    <div className="text-[10px] text-champagne-gold uppercase tracking-widest mt-1">
                                        {new Date(booking.master_class?.date_time).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-center text-[#3D2B1F] font-serif italic">
                                    {booking.tickets}
                                </td>
                                <td className="py-4 px-6 text-center font-serif italic text-[#3D2B1F]">
                                    {(booking.tickets * (booking.master_class?.price || 0)).toLocaleString()} ₽
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <button 
                                        onClick={() => handleDelete(booking.id)} 
                                        className="text-[#3D2B1F] hover:text-red-500 transition-colors opacity-40 group-hover:opacity-100" 
                                        title="Удалить запись"
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
                                <td colSpan="6" className="py-20 text-center text-[#3D2B1F]/30 italic font-serif">
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
