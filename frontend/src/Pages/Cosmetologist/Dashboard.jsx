import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <BeautyLayout>
            <Head title="Панель специалиста — Beauty Atelier" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="mb-12">
                    <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-champagne-gold mb-4">Личный кабинет</p>
                    <h1 className="font-serif italic text-6xl text-deep-espresso">Панель специалиста</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="bg-[#FAF9F6] p-10 border border-deep-espresso/5 mb-8">
                            <h2 className="font-serif text-3xl text-deep-espresso mb-6">Добро пожаловать, {auth.user.name}!</h2>
                            <p className="text-gray-500 font-light leading-relaxed mb-8">
                                Здесь вы можете управлять своими статьями в Космо-блоге, делиться советами и рекомендовать лучшие продукты нашим клиентам.
                            </p>
                            <div className="flex gap-4">
                                <Link 
                                    href={route('cosmetologist.posts.index')}
                                    className="bg-deep-espresso text-creamy-silk px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-colors"
                                >
                                    Мои статьи
                                </Link>
                                <Link 
                                    href={route('cosmetologist.posts.create')}
                                    className="border border-deep-espresso text-deep-espresso px-8 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-deep-espresso hover:text-white transition-all"
                                >
                                    Написать пост
                                </Link>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="border border-deep-espresso/5 p-8">
                                <h3 className="uppercase tracking-widest text-[10px] font-bold mb-4 opacity-40">Профиль</h3>
                                <p className="text-sm font-bold mb-1">{auth.user.specialization || 'Специализация не указана'}</p>
                                <p className="text-xs text-gray-400 line-clamp-2">{auth.user.biography || 'Биография не заполнена'}</p>
                            </div>
                            <div className="border border-deep-espresso/5 p-8">
                                <h3 className="uppercase tracking-widest text-[10px] font-bold mb-4 opacity-40">Статистика</h3>
                                <p className="text-sm font-bold mb-1">Доступно функций: 3</p>
                                <p className="text-xs text-gray-400">Блог, Рекомендации, Личный профиль</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-creamy-silk p-8 border border-champagne-gold/10">
                        <h3 className="font-serif text-xl mb-6">Ваша роль</h3>
                        <p className="text-xs text-gray-500 leading-relaxed mb-6">
                            Как косметолог Beauty Atelier, вы являетесь экспертом, к мнению которого прислушиваются. Ваши статьи помогают клиентам правильно выбирать уход и макияж.
                        </p>
                        <ul className="text-[10px] uppercase tracking-widest font-bold space-y-4 text-deep-espresso/60">
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-champagne-gold rounded-full"></span>
                                Публикация статей
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-champagne-gold rounded-full"></span>
                                Рекомендация товаров
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1 h-1 bg-champagne-gold rounded-full"></span>
                                Персональный профиль автора
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </BeautyLayout>
    );
}
