import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ products }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Вы уверены, что хотите удалить этот товар?')) {
            destroy(route('admin.products.destroy', id));
        }
    };

    // Перевод меток пагинации
    const translateLabel = (label) => {
        if (label.includes('Previous')) return '« Назад';
        if (label.includes('Next')) return 'Вперед »';
        return label;
    };

    const categoryLabels = {
        'face': 'Лицо',
        'eyes': 'Глаза',
        'lips': 'Губы',
        'tools': 'Инструменты'
    };

    return (
        <AdminLayout>
            <Head title="Товары" />
            
            <div className="flex justify-between items-end mb-12">
                <h1 className="font-serif text-4xl italic text-[#3D2B1F]">Товары</h1>
                <Link
                    href={route('admin.products.create')}
                    className="inline-block border border-[#3D2B1F] text-[#3D2B1F] uppercase tracking-[0.2em] text-[10px] font-bold px-8 py-3 hover:bg-[#3D2B1F] hover:text-white transition-all duration-300"
                >
                    Добавить товар
                </Link>
            </div>

            <div className="bg-white shadow-sm border border-[#3D2B1F]/5 overflow-hidden">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="border-b border-[#3D2B1F]/10">
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 w-16 text-center">ID</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 w-20">Фото</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60">Название</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Категория</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Цена</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Образ месяца</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3D2B1F]/5">
                        {products.data.map((product) => (
                            <tr key={product.id} className="hover:bg-[#FDF5E6]/30 transition-colors group">
                                <td className="py-4 px-6 font-serif italic text-[#3D2B1F] text-xs text-center">
                                    #{product.id}
                                </td>
                                <td className="py-4 px-6">
                                    <div className="w-12 h-12 bg-gray-50 border border-[#3D2B1F]/5 overflow-hidden">
                                        {product.image_path ? (
                                            <img src={`/storage/${product.image_path}`} alt="" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-300 uppercase">Нет фото</div>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 px-6 font-medium text-[#3D2B1F] text-sm">
                                    {product.name}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <span className="inline-block border border-[#D4AF37]/30 text-[#8B5A2B] px-3 py-1 text-[9px] uppercase tracking-widest rounded-full font-medium">
                                        {categoryLabels[product.category] || product.category}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-center font-serif italic text-[#3D2B1F]">
                                    {product.price ? `${Number(product.price).toLocaleString()} ₽` : '—'}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    {product.is_look_of_month ? (
                                        <span className="text-[#8B5A2B] text-[10px] uppercase tracking-widest font-bold">Да</span>
                                    ) : (
                                        <span className="text-gray-300 text-[10px]">Нет</span>
                                    )}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <div className="flex item-center justify-center gap-4 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <Link href={route('admin.products.skus.index', product.id)} className="text-[#3D2B1F] hover:text-[#D4AF37] transition-colors" title="Управление оттенками">
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                            </svg>
                                        </Link>
                                        <Link href={route('admin.products.edit', product.id)} className="text-[#3D2B1F] hover:text-[#8B5A2B] transition-colors" title="Редактировать">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                        </Link>
                                        <button onClick={() => handleDelete(product.id)} className="text-[#3D2B1F] hover:text-red-500 transition-colors" title="Удалить">
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
            
            {/* Pagination Links */}
             <div className="flex justify-center mt-10">
                {products.links.map((link, index) => (
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