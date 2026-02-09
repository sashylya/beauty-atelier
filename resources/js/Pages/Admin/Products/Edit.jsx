import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ product }) {
    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        description: product.description || '',
        composition: product.composition || '',
        category: product.category,
        price: product.price || '',
        image: null,
        is_hit: Boolean(product.is_hit),
        is_look_of_month: Boolean(product.is_look_of_month),
        _method: 'PATCH',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.products.update', product.id));
    };

    return (
        <AdminLayout>
            <Head title="Редактировать товар" />
            
            <div className="mb-8">
                 <Link href={route('admin.products.index')} className="text-[#8B5A2B] hover:text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] mb-4 inline-block transition-colors">
                    &larr; Назад к списку
                </Link>
                <h1 className="font-serif text-4xl italic text-[#3D2B1F]">Редактировать товар</h1>
            </div>

            <div className="bg-white p-8 shadow-sm border border-[#3D2B1F]/5 max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="name">
                                Название
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] placeholder-gray-400 p-3"
                            />
                            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                        </div>

                        <div>
                            <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="category">
                                Категория
                            </label>
                            <select
                                id="category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                 className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] p-3"
                            >
                                <option value="face">Лицо</option>
                                <option value="eyes">Глаза</option>
                                <option value="lips">Губы</option>
                                <option value="tools">Инструменты</option>
                            </select>
                            {errors.category && <div className="text-red-500 text-xs mt-1">{errors.category}</div>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="price">
                                Цена (в рублях ₽)
                            </label>
                            <input
                                type="number"
                                id="price"
                                step="1"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] placeholder-gray-400 p-3"
                            />
                            {errors.price && <div className="text-red-500 text-xs mt-1">{errors.price}</div>}
                        </div>

                        <div>
                            <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="image">
                                Изменить фото
                            </label>
                            <input
                                type="file"
                                id="image"
                                onChange={(e) => setData('image', e.target.files[0])}
                                className="w-full text-xs text-gray-500 file:mr-4 file:py-3 file:px-4 file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:font-bold file:bg-[#3D2B1F]/5 file:text-[#3D2B1F] hover:file:bg-[#3D2B1F]/10"
                                accept="image/*"
                            />
                            {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="description">
                            Описание
                        </label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] placeholder-gray-400 p-3"
                            rows="3"
                        ></textarea>
                        {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
                    </div>

                    <div>
                        <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="composition">
                            Состав
                        </label>
                        <textarea
                            id="composition"
                            value={data.composition}
                            onChange={(e) => setData('composition', e.target.value)}
                            className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] placeholder-gray-400 p-3"
                            rows="3"
                        ></textarea>
                        {errors.composition && <div className="text-red-500 text-xs mt-1">{errors.composition}</div>}
                    </div>

                     <div className="flex gap-10 pt-4 border-t border-[#3D2B1F]/10">
                        <label className="flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={data.is_hit}
                                onChange={(e) => setData('is_hit', e.target.checked)}
                                className="form-checkbox h-5 w-5 text-[#8B5A2B] border-[#3D2B1F]/20 focus:ring-0"
                            />
                            <span className="ml-3 text-[#3D2B1F] text-sm group-hover:text-[#8B5A2B] transition-colors font-medium">Хит продаж?</span>
                        </label>

                         <label className="flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={data.is_look_of_month}
                                onChange={(e) => setData('is_look_of_month', e.target.checked)}
                                className="form-checkbox h-5 w-5 text-[#8B5A2B] border-[#3D2B1F]/20 focus:ring-0"
                            />
                            <span className="ml-3 text-[#3D2B1F] text-sm group-hover:text-[#8B5A2B] transition-colors font-medium">Образ месяца?</span>
                        </label>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#3D2B1F] hover:bg-[#8B5A2B] text-white uppercase tracking-[0.2em] text-[10px] font-bold py-4 px-8 w-full transition-all duration-300 shadow-lg shadow-[#3D2B1F]/20"
                        >
                            {processing ? 'Сохранение...' : 'Обновить товар'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
