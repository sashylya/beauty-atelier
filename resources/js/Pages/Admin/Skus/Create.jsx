import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ product }) {
    const { data, setData, post, processing, errors } = useForm({
        shade_name: '',
        color_hex: '#3D2B1F',
        price: product.price || '',
        stock: 10,
        image: null,
        video_url: '',
        coverage: '',
        finish: '',
        dress_code: '',
        durability: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.products.skus.store', product.id));
    };

    return (
        <AdminLayout>
            <Head title={`Добавить оттенок - ${product.name}`} />
            
            <div className="mb-8">
                <Link href={route('admin.products.skus.index', product.id)} className="text-[#8B5A2B] hover:text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] mb-4 inline-block transition-colors">
                    &larr; К списку оттенков
                </Link>
                <h1 className="font-serif text-4xl italic text-[#3D2B1F]">Добавить оттенок</h1>
                <p className="text-[#3D2B1F]/60 text-sm mt-2">для товара: {product.name}</p>
            </div>

            <div className="bg-white p-8 shadow-sm border border-[#3D2B1F]/5 max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                    
                    {/* Основная информация */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="shade_name">
                                Название оттенка
                            </label>
                            <input
                                type="text"
                                id="shade_name"
                                value={data.shade_name}
                                onChange={(e) => setData('shade_name', e.target.value)}
                                className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] p-3"
                                placeholder="Например: Нежный нюд"
                            />
                            {errors.shade_name && <div className="text-red-500 text-xs mt-1">{errors.shade_name}</div>}
                        </div>

                        <div>
                            <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="color_hex">
                                Цвет (для кружочка)
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="color"
                                    id="color_hex_picker"
                                    value={data.color_hex}
                                    onChange={(e) => setData('color_hex', e.target.value)}
                                    className="h-12 w-12 border border-[#3D2B1F]/20 p-1 cursor-pointer bg-white"
                                />
                                <input
                                    type="text"
                                    id="color_hex"
                                    value={data.color_hex}
                                    onChange={(e) => setData('color_hex', e.target.value)}
                                    className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] p-3 font-mono"
                                    placeholder="#RRGGBB"
                                />
                            </div>
                             {errors.color_hex && <div className="text-red-500 text-xs mt-1">{errors.color_hex}</div>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="price">
                                Цена оттенка (в рублях ₽)
                            </label>
                            <input
                                type="number"
                                step="1"
                                id="price"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] p-3"
                            />
                            {errors.price && <div className="text-red-500 text-xs mt-1">{errors.price}</div>}
                        </div>

                        <div>
                            <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="stock">
                                Количество в наличии
                            </label>
                            <input
                                type="number"
                                id="stock"
                                value={data.stock}
                                onChange={(e) => setData('stock', e.target.value)}
                                className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] p-3"
                            />
                            {errors.stock && <div className="text-red-500 text-xs mt-1">{errors.stock}</div>}
                        </div>
                    </div>

                    {/* Медиа */}
                    <div className="pt-6 border-t border-[#3D2B1F]/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="image">
                                    Фото оттенка (переключает главное фото)
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

                            <div>
                                <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="video_url">
                                    Ссылка на видео/текстуру (необязательно)
                                </label>
                                 <input
                                    type="text"
                                    id="video_url"
                                    value={data.video_url}
                                    onChange={(e) => setData('video_url', e.target.value)}
                                    className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] p-3"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Характеристики */}
                    <div className="pt-6 border-t border-[#3D2B1F]/10">
                        <p className="text-[#3D2B1F] text-[10px] uppercase tracking-[0.3em] font-black mb-6 opacity-30">Характеристики оттенка</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div>
                                <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="coverage">
                                    Покрытие
                                </label>
                                <select
                                    id="coverage"
                                    value={data.coverage}
                                    onChange={(e) => setData('coverage', e.target.value)}
                                    className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] p-3"
                                >
                                    <option value="">Выберите покрытие</option>
                                    <option value="Вуальное">Вуальное</option>
                                    <option value="Легкое">Легкое</option>
                                    <option value="Среднее">Среднее</option>
                                    <option value="Полное">Полное</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="finish">
                                    Финиш
                                </label>
                                <select
                                    id="finish"
                                    value={data.finish}
                                    onChange={(e) => setData('finish', e.target.value)}
                                    className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] p-3"
                                >
                                    <option value="">Выберите финиш</option>
                                    <option value="Матовый">Матовый</option>
                                    <option value="Сатиновый">Сатиновый</option>
                                    <option value="Глянцевый">Глянцевый</option>
                                    <option value="Натуральный">Натуральный</option>
                                     <option value="Сияющий">Сияющий</option>
                                </select>
                            </div>

                             <div>
                                <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="dress_code">
                                    Дресс-код
                                </label>
                                <input
                                    type="text"
                                    id="dress_code"
                                    value={data.dress_code}
                                    onChange={(e) => setData('dress_code', e.target.value)}
                                    className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] p-3"
                                    placeholder="Например: Business Casual"
                                />
                            </div>
                             <div>
                                <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="durability">
                                    Стойкость
                                </label>
                                <input
                                    type="text"
                                    id="durability"
                                    value={data.durability}
                                    onChange={(e) => setData('durability', e.target.value)}
                                    className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] p-3"
                                    placeholder="Например: До 12 часов"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-10">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#3D2B1F] hover:bg-[#8B5A2B] text-white uppercase tracking-[0.2em] text-[10px] font-bold py-5 px-10 w-full transition-all duration-300 shadow-xl shadow-[#3D2B1F]/10"
                        >
                            {processing ? 'Сохранение...' : 'Сохранить оттенок'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}