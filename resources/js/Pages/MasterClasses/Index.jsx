import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ masterClasses }) {
    return (
        <BeautyLayout>
            <Head title="Мастер-классы — Beauty Atelier" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <header className="text-center mb-32">
                    <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-champagne-gold mb-6">Обучение искусству</p>
                    <h1 className="font-serif italic text-7xl text-deep-espresso mb-10">Мастер-классы в Ателье</h1>
                    <p className="max-w-2xl mx-auto text-deep-espresso/60 leading-relaxed font-light italic text-lg">
                        Зайдите в нашу лабораторию. Под руководством наших мастеров
                        откройте для себя алхимию пигментов и создайте свою уникальную красоту.
                    </p>
                </header>

                <div className="space-y-40">
                    {masterClasses.map((mc, index) => {
                        const date = new Date(mc.date_time);
                        return (
                            <div key={mc.id} className={`flex flex-col lg:flex-row items-center gap-20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                {/* Image / Visual Side */}
                                <div className="w-full lg:w-3/5 aspect-[16/10] bg-white relative overflow-hidden group shadow-sm">
                                    <div className="absolute inset-0 bg-[#F8F8F8] flex items-center justify-center">
                                         <div className="text-center opacity-5 transition-transform duration-1000 group-hover:scale-110">
                                            <span className="font-serif italic text-[15vw] lg:text-[8vw] text-deep-espresso uppercase tracking-tighter leading-none block">
                                                {mc.title.split(' ')[0]}
                                            </span>
                                         </div>
                                    </div>
                                    
                                    {/* Date Floating Card */}
                                    <div className="absolute top-0 left-12 bg-deep-espresso text-creamy-silk px-6 py-10 flex flex-col items-center shadow-2xl">
                                        <span className="text-4xl font-serif italic mb-2">{date.getDate()}</span>
                                        <span className="text-[9px] uppercase tracking-[0.3em] font-bold border-t border-creamy-silk/20 pt-3">
                                            {date.toLocaleString('ru-RU', { month: 'short' }).toUpperCase()}
                                        </span>
                                    </div>

                                    {/* Location Overlay */}
                                    <div className="absolute bottom-8 right-8 text-right hidden lg:block">
                                        <p className="uppercase tracking-[0.3em] text-[8px] font-bold text-deep-espresso/30 mb-2">Локация</p>
                                        <p className="font-serif italic text-xl text-deep-espresso">{mc.location}</p>
                                    </div>
                                </div>
                                
                                {/* Info Side */}
                                <div className="w-full lg:w-2/5 space-y-10">
                                    <div>
                                        <p className="uppercase tracking-[0.3em] text-[10px] font-bold text-champagne-gold mb-4">
                                            {date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} • Сезонное событие
                                        </p>
                                        <h2 className="font-serif italic text-5xl text-deep-espresso leading-tight">{mc.title}</h2>
                                    </div>

                                    <p className="text-deep-espresso/70 leading-relaxed font-light text-base lg:text-lg">
                                        {mc.description}
                                    </p>

                                    <div className="space-y-8">
                                        <div className="flex items-center space-x-12 border-t border-deep-espresso/10 pt-10">
                                            <div>
                                                <p className="uppercase tracking-[0.3em] text-[8px] font-bold opacity-30 mb-2">Цена за гостя</p>
                                                <p className="text-2xl font-light tracking-tight">{mc.price.toLocaleString()} ₽</p>
                                            </div>
                                            <div>
                                                <p className="uppercase tracking-[0.3em] text-[8px] font-bold opacity-30 mb-2">Наличие мест</p>
                                                <p className="text-[11px] uppercase tracking-widest font-bold text-champagne-gold">{mc.capacity} Мест</p>
                                            </div>
                                        </div>

                                        <Link 
                                            href={route('master-classes.show', mc.id)}
                                            className="inline-block w-full text-center bg-deep-espresso text-creamy-silk uppercase tracking-[0.4em] text-[11px] font-bold py-6 hover:bg-champagne-gold transition-all duration-500 shadow-xl hover:shadow-none"
                                        >
                                            Узнать больше и забронировать
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Aesthetic Quote or CTA */}
                <div className="mt-60 text-center py-40 border-t border-deep-espresso/5">
                    <p className="font-serif italic text-3xl text-deep-espresso/80 max-w-3xl mx-auto leading-relaxed">
                        "В ателье макияж — это не маска, а диалог между цветом и кожей."
                    </p>
                    <div className="mt-12 flex justify-center space-x-4 items-center">
                        <div className="h-px w-12 bg-champagne-gold"></div>
                        <span className="uppercase tracking-[0.5em] text-[9px] font-bold text-champagne-gold">Мастер-визажист</span>
                        <div className="h-px w-12 bg-champagne-gold"></div>
                    </div>
                </div>
            </div>
        </BeautyLayout>
    );
}