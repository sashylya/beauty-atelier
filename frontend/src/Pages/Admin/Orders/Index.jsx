import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, Link } from '@inertiajs/react';

export default function Index({ orders, filters, statuses }) {
    
    const handleStatusChange = (orderId, newStatus) => {
        router.patch(route('admin.orders.update-status', orderId), {
            status: newStatus
        }, {
            preserveScroll: true
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'new': return 'text-blue-600 border-blue-200 bg-blue-50';
            case 'paid': return 'text-green-600 border-green-200 bg-green-50';
            case 'packed': return 'text-amber-600 border-amber-200 bg-amber-50';
            case 'shipped': return 'text-purple-600 border-purple-200 bg-purple-50';
            case 'completed': return 'text-gray-600 border-gray-200 bg-gray-50';
            case 'cancelled': return 'text-red-600 border-red-200 bg-red-50';
            default: return 'text-gray-600 border-gray-200 bg-gray-50';
        }
    };

    const translateLabel = (label) => {
        if (label.includes('Previous')) return '«';
        if (label.includes('Next')) return '»';
        return label;
    };

    return (
        <AdminLayout>
            <Head title="Управление заказами" />
            
            <div className="flex justify-between items-end mb-12">
                <h1 className="font-serif text-4xl italic text-[#3D2B1F]">Заказы</h1>
                
                <div className="flex gap-4">
                    <select 
                        value={filters.status || ''} 
                        onChange={(e) => router.get(route('admin.orders.index'), { status: e.target.value }, { preserveState: true })}
                        className="bg-white border border-[#3D2B1F]/10 px-4 py-2 text-[10px] uppercase tracking-widest outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    >
                        <option value="">Все статусы</option>
                        {Object.entries(statuses).map(([key, label]) => (
                            <option key={key} value={key}>{label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-white shadow-sm border border-[#3D2B1F]/5 overflow-hidden">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="border-b border-[#3D2B1F]/10">
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 w-16 text-center">ID</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60">Дата</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60">Клиент</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60">Адрес доставки</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Сумма</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Статус</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3D2B1F]/5">
                        {orders.data.map((order) => (
                            <tr key={order.id} className="hover:bg-[#FDF5E6]/30 transition-colors group">
                                <td className="py-4 px-6 font-serif italic text-[#3D2B1F] text-xs text-center">
                                    #{order.id}
                                </td>
                                <td className="py-4 px-6 text-xs text-[#3D2B1F]/60">
                                    {new Date(order.created_at).toLocaleDateString('ru-RU')}
                                </td>
                                <td className="py-4 px-6 font-medium text-[#3D2B1F] text-sm">
                                    {order.user?.name}
                                    <div className="text-[10px] text-[#3D2B1F]/40 font-normal">{order.user?.email}</div>
                                </td>
                                <td className="py-4 px-6 text-xs text-[#3D2B1F]/80 max-w-xs">
                                    {order.shipping_address}
                                </td>
                                <td className="py-4 px-6 text-center font-serif italic text-[#3D2B1F]">
                                    {Number(order.total_amount).toLocaleString()} ₽
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <span className={`inline-block px-3 py-1 text-[9px] uppercase tracking-widest rounded-full font-bold border ${getStatusColor(order.status)}`}>
                                        {statuses[order.status]}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <select 
                                        value={order.status} 
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                        className="text-[10px] uppercase tracking-widest border border-[#3D2B1F]/10 px-2 py-1 outline-none focus:ring-1 focus:ring-[#D4AF37]"
                                    >
                                        {Object.entries(statuses).map(([key, label]) => (
                                            <option key={key} value={key}>{label}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination Links */}
             <div className="flex justify-center mt-10">
                {orders.links.map((link, index) => (
                    link.url ? (
                        <Link
                            key={index}
                            href={link.url}
                            className={`px-4 py-2 text-xs border ${
                                link.active 
                                    ? 'bg-[#3D2B1F] text-[#FDF5E6] border-[#3D2B1F]' 
                                    : 'bg-transparent text-[#3D2B1F] border-transparent hover:border-[#3D2B1F]/30'
                            }`}
                            dangerouslySetInnerHTML={{ __html: translateLabel(link.label) }}
                        />
                    ) : (
                        <span
                            key={index}
                            className="px-4 py-2 text-xs border border-transparent opacity-30 cursor-not-allowed text-[#3D2B1F]"
                            dangerouslySetInnerHTML={{ __html: translateLabel(link.label) }}
                        />
                    )
                ))}
            </div>

        </AdminLayout>
    );
}
