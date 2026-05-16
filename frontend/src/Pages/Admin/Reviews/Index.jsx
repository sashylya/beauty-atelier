import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router, Link } from '@inertiajs/react';

export default function Index({ reviews, filters }) {
    const { delete: destroy } = useForm();

    const handleApprove = (id) => {
        router.post(route('admin.reviews.approve', id));
    };

    const handleDelete = (id) => {
        if (confirm('Вы уверены, что хотите удалить этот отзыв?')) {
            destroy(route('admin.reviews.destroy', id));
        }
    };

    const translateLabel = (label) => {
        if (label.includes('Previous')) return '«';
        if (label.includes('Next')) return '»';
        return label;
    };

    return (
        <AdminLayout>
            <Head title="Модерация отзывов" />
            
            <div className="flex justify-between items-end mb-12">
                <h1 className="font-serif text-4xl italic text-[#3D2B1F]">Модерация отзывов</h1>
                
                <div className="flex gap-4">
                    <select 
                        value={filters.status || ''} 
                        onChange={(e) => router.get(route('admin.reviews.index'), { status: e.target.value }, { preserveState: true })}
                        className="bg-white border border-[#3D2B1F]/10 px-4 py-2 text-[10px] uppercase tracking-widest outline-none focus:ring-1 focus:ring-[#D4AF37]"
                    >
                        <option value="">Все статусы</option>
                        <option value="pending">Ожидают</option>
                        <option value="approved">Одобрены</option>
                    </select>
                </div>
            </div>

            <div className="bg-white shadow-sm border border-[#3D2B1F]/5 overflow-hidden rounded-sm">
                <table className="w-full text-left table-fixed border-collapse">
                    <thead>
                        <tr className="border-b border-[#3D2B1F]/10 bg-[#FDF5E6]/10">
                            <th className="py-6 px-4 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 w-[80px]">Дата</th>
                            <th className="py-6 px-4 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 w-[100px]">Пользователь</th>
                            <th className="py-6 px-4 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 w-[120px]">Товар</th>
                            <th className="py-6 px-4 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 w-[100px]">Оттенок</th>
                            <th className="py-6 px-4 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center w-[80px]">Оценка</th>
                            <th className="py-6 px-4 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 w-auto">Комментарий</th>
                            <th className="py-6 px-4 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center w-[90px]">Статус</th>
                            <th className="py-6 px-4 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center w-[100px]">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3D2B1F]/5">
                        {reviews.data.map((review) => (
                            <tr key={review.id} className="hover:bg-[#FDF5E6]/30 transition-colors group">
                                <td className="py-4 px-4 text-[10px] text-[#3D2B1F]/60">
                                    {new Date(review.created_at).toLocaleDateString('ru-RU')}
                                </td>
                                <td className="py-4 px-4 font-medium text-[#3D2B1F] text-[11px] truncate" title={review.user?.name}>
                                    {review.user?.name || 'Удален'}
                                </td>
                                <td className="py-4 px-4 text-[11px] text-[#3D2B1F] truncate" title={review.product?.name}>
                                    {review.product?.name || 'Удален'}
                                </td>
                                <td className="py-4 px-4">
                                    {review.sku ? (
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <div className="w-2 h-2 rounded-full border border-[#3D2B1F]/10 flex-shrink-0" style={{ backgroundColor: review.sku.color_hex }}></div>
                                            <span className="text-[9px] uppercase tracking-wider text-[#3D2B1F]/60 truncate" title={review.sku.shade_name}>{review.sku.shade_name}</span>
                                        </div>
                                    ) : (
                                        <span className="text-[10px] uppercase tracking-wider text-[#3D2B1F]/30">—</span>
                                    )}
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <div className="flex justify-center text-champagne-gold">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className={`w-2.5 h-2.5 ${i < review.rating ? 'fill-current' : 'fill-none stroke-current'}`} viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        ))}
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-[11px] text-[#3D2B1F]/80 leading-relaxed break-words">
                                    {review.comment}
                                </td>                                <td className="py-4 px-6 text-center">
                                    {review.is_approved ? (
                                        <span className="text-green-600 text-[9px] uppercase tracking-widest font-bold">Одобрен</span>
                                    ) : (
                                        <span className="text-amber-600 text-[9px] uppercase tracking-widest font-bold">Ожидает</span>
                                    )}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <div className="flex item-center justify-center gap-4 opacity-60 group-hover:opacity-100 transition-opacity">
                                        {!review.is_approved && (
                                            <button 
                                                onClick={() => handleApprove(review.id)} 
                                                className="text-green-600 hover:text-green-800 transition-colors" 
                                                title="Одобрить"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleDelete(review.id)} 
                                            className="text-red-600 hover:text-red-800 transition-colors" 
                                            title="Удалить"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Links */}
            <div className="flex justify-center mt-10">
                {reviews.links.map((link, index) => (
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
