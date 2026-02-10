import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        program: '',
        date_time: '',
        price: '',
        capacity: 10,
        location: 'Главное Ателье, Москва',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.master-classes.store'));
    };

    return (
        <AdminLayout>
            <Head title="Создать мастер-класс" />
            
            <div className="mb-8">
                <Link href={route('admin.master-classes.index')} className="text-[#8B5A2B] hover:text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] mb-4 inline-block transition-colors">
                    &larr; Назад к списку
                </Link>
                <h1 className="font-serif text-4xl italic text-[#3D2B1F]">Создать мастер-класс</h1>
            </div>

            <div className="bg-white p-8 shadow-sm border border-[#3D2B1F]/5 max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="title">
                            Название
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] placeholder-gray-400 p-3"
                            placeholder="Например: Искусство макияжа для себя"
                        />
                        {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                    </div>

                    <div>
                        <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="image">
                            Фотография мастер-класса
                        </label>
                        <input
                            type="file"
                            id="image"
                            onChange={(e) => setData('image', e.target.files[0])}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:font-bold file:bg-[#3D2B1F] file:text-white hover:file:bg-[#8B5A2B] transition-all"
                        />
                        {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="date_time">
                                Дата и время
                            </label>
                            <input
                                type="datetime-local"
                                id="date_time"
                                value={data.date_time}
                                onChange={(e) => setData('date_time', e.target.value)}
                                className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] p-3"
                            />
                            {errors.date_time && <div className="text-red-500 text-xs mt-1">{errors.date_time}</div>}
                        </div>

                        <div>
                            <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="price">
                                Стоимость (₽)
                            </label>
                            <input
                                type="number"
                                id="price"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] placeholder-gray-400 p-3"
                            />
                            {errors.price && <div className="text-red-500 text-xs mt-1">{errors.price}</div>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="capacity">
                                Вместимость (человек)
                            </label>
                            <input
                                type="number"
                                id="capacity"
                                value={data.capacity}
                                onChange={(e) => setData('capacity', e.target.value)}
                                className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] p-3"
                            />
                            {errors.capacity && <div className="text-red-500 text-xs mt-1">{errors.capacity}</div>}
                        </div>

                        <div>
                            <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="location">
                                Локация
                            </label>
                            <input
                                type="text"
                                id="location"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] placeholder-gray-400 p-3"
                            />
                            {errors.location && <div className="text-red-500 text-xs mt-1">{errors.location}</div>}
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
                        <label className="block text-[#3D2B1F] text-[10px] uppercase tracking-[0.2em] font-bold mb-3" htmlFor="program">
                            Программа (каждый пункт с новой строки)
                        </label>
                        <textarea
                            id="program"
                            value={data.program}
                            onChange={(e) => setData('program', e.target.value)}
                            className="w-full border-[#3D2B1F]/20 focus:border-[#D4AF37] focus:ring-0 text-[#3D2B1F] placeholder-gray-400 p-3"
                            rows="5"
                            placeholder="Пункт 1&#10;Пункт 2&#10;Пункт 3"
                        ></textarea>
                        {errors.program && <div className="text-red-500 text-xs mt-1">{errors.program}</div>}
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#3D2B1F] hover:bg-[#8B5A2B] text-white uppercase tracking-[0.2em] text-[10px] font-bold py-4 px-8 w-full transition-all duration-300 shadow-lg shadow-[#3D2B1F]/20"
                        >
                            {processing ? 'Сохранение...' : 'Создать мастер-класс'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
