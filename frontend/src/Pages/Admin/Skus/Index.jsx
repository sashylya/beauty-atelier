import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Index({ product, skus }) {
    const { delete: destroy } = useForm();

    const handleDelete = (skuId) => {
        if (confirm('Вы уверены, что хотите удалить этот оттенок?')) {
            destroy(route('admin.products.skus.destroy', [product.id, skuId]));
        }
    };

    return (
        <AdminLayout>
            <Head title={`Оттенки для ${product.name}`} />
            
            <div className="mb-12">
                 <Link href={route('admin.products.index')} className="text-[#8B5A2B] hover:text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] mb-4 inline-block transition-colors">
                    &larr; Назад к товарам
                </Link>
                <div className="flex justify-between items-end mt-2">
                    <div>
                        <h1 className="font-serif text-4xl italic text-[#3D2B1F]">Оттенки: {product.name}</h1>
                        <p className="text-[#3D2B1F]/60 mt-2 font-light">Управление вариациями (оттенки, цены, остатки)</p>
                    </div>
                    <Link
                        href={route('admin.products.skus.create', product.id)}
                        className="inline-block border border-[#3D2B1F] text-[#3D2B1F] uppercase tracking-[0.2em] text-[10px] font-bold px-8 py-3 hover:bg-[#3D2B1F] hover:text-white transition-all duration-300"
                    >
                        Добавить оттенок
                    </Link>
                </div>
            </div>

            <div className="bg-white shadow-sm border border-[#3D2B1F]/5 overflow-hidden">
                <table className="min-w-full text-left">
                    <thead>
                        <tr className="border-b border-[#3D2B1F]/10">
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60">Оттенок</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Цвет</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-right">Цена</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Остаток</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-left">Характеристики</th>
                            <th className="py-6 px-6 text-[9px] uppercase tracking-[0.2em] font-medium text-[#3D2B1F]/60 text-center">Действия</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3D2B1F]/5">
                        {skus.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-[#3D2B1F]/50 italic font-serif">Оттенки не найдены. Создайте первый!</td>
                            </tr>
                        ) : (
                            skus.map((sku) => (
                                <tr key={sku.id} className="hover:bg-[#FDF5E6]/30 transition-colors">
                                    <td className="py-4 px-6 font-medium text-[#3D2B1F]">
                                        {sku.shade_name}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        {sku.color_hex && (
                                            <div 
                                                className="w-6 h-6 rounded-full border border-gray-200 mx-auto shadow-sm" 
                                                style={{ backgroundColor: sku.color_hex }}
                                                title={sku.color_hex}
                                            ></div>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 text-right font-serif text-[#3D2B1F]">
                                        {Number(sku.price).toLocaleString('ru-RU')} ₽
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`${sku.stock > 0 ? 'bg-[#FDF5E6] text-[#8B5A2B] border border-[#D4AF37]/30' : 'bg-red-50 text-red-600 border border-red-100'} py-1 px-3 rounded-full text-[10px] uppercase tracking-widest`}>
                                            {sku.stock}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-left text-xs text-[#3D2B1F]/70">
                                        {sku.coverage && <div>Плотность: {sku.coverage}</div>}
                                        {sku.finish && <div>Финиш: {sku.finish}</div>}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="flex item-center justify-center gap-4 opacity-60 hover:opacity-100 transition-opacity">
                                            <Link href={route('admin.products.skus.edit', [product.id, sku.id])} className="text-[#3D2B1F] hover:text-[#8B5A2B] transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                            </Link>
                                            <button onClick={() => handleDelete(sku.id)} className="text-[#3D2B1F] hover:text-red-500 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
