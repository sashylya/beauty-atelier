import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ masterClasses }) {
    const sortedMasterClasses = [...masterClasses].sort((a, b) => {
        const dateA = new Date(a.date_time);
        const dateB = new Date(b.date_time);
        const now = new Date();
        const isPassedA = dateA < now;
        const isPassedB = dateB < now;

        if (isPassedA !== isPassedB) {
            return isPassedA ? 1 : -1;
        }
        
        return isPassedA ? dateB - dateA : dateA - dateB;
    });

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
                    {sortedMasterClasses.map((mc, index) => {
                        const date = new Date(mc.date_time);
                        const isPassed = date < new Date();
                        return (
                            <div key={mc.id} className={`flex flex-col lg:flex-row items-center gap-20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} ${isPassed ? 'opacity-60' : ''}`}>
                                {/* Image / Visual Side */}
                                <div className="w-full lg:w-3/5 aspect-[16/10] bg-white relative overflow-hidden group shadow-sm">
                                    {isPassed && (
                                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] z-10 flex items-center justify-center">
                                            <div className="border-2 border-deep-espresso/20 px-6 py-3 -rotate-12 bg-white/40">
                                                <p className="font-serif italic text-2xl text-deep-espresso opacity-40 uppercase tracking-widest">Завершено</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-[#F8F8F8] flex items-center justify-center">
                                         {mc.image_url && (
                                             <img 
                                                src={`/storage/${mc.image_url}`} 
                                                alt={mc.title} 
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                             />
                                         )}
                                    </div>
                                </div>
                                
                                {/* Info Side */}
                                <div className="w-full lg:w-2/5 space-y-10">
                                    <div>
                                        <p className="uppercase tracking-[0.3em] text-[10px] font-bold text-champagne-gold mb-4">
                                            {isPassed ? 'Прошедшее событие' : (
                                                <>
                                                    {date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })} • {date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                                </>
                                            )}
                                        </p>
                                        <h2 className={`font-serif italic text-5xl text-deep-espresso leading-tight ${isPassed ? 'opacity-40' : ''}`}>{mc.title}</h2>
                                    </div>

                                    <p className="text-deep-espresso/70 leading-relaxed font-light text-base lg:text-lg">
                                        {mc.description}
                                    </p>

                                    <div className="space-y-8">
                                        <div className="flex items-center space-x-12 border-t border-deep-espresso/10 pt-10">
                                            <div>
                                                <p className="uppercase tracking-[0.3em] text-[8px] font-bold opacity-30 mb-2">Цена</p>
                                                <p className="text-2xl font-light tracking-tight">{mc.price.toLocaleString()} ₽</p>
                                            </div>
                                            {!isPassed && (
                                                <div>
                                                    <p className="uppercase tracking-[0.3em] text-[8px] font-bold opacity-30 mb-2">Наличие мест</p>
                                                    <p className="text-[11px] uppercase tracking-widest font-bold text-champagne-gold">
                                                        {mc.available_seats > 0 ? `${mc.available_seats} Мест` : 'Нет мест'}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="pb-4">
                                            <p className="uppercase tracking-[0.3em] text-[8px] font-bold opacity-30 mb-2">Локация</p>
                                            <p className="font-serif italic text-sm text-deep-espresso">{mc.location}</p>
                                        </div>

                                        <Link 
                                            href={route('master-classes.show', mc.id)}
                                            className={`inline-block w-full text-center uppercase tracking-[0.4em] text-[11px] font-bold py-6 transition-all duration-500 shadow-xl hover:shadow-none ${
                                                isPassed 
                                                    ? 'bg-gray-100 text-gray-400 border border-gray-200 shadow-none' 
                                                    : 'bg-deep-espresso text-creamy-silk hover:bg-champagne-gold'
                                            }`}
                                        >
                                            {isPassed ? 'Посмотреть детали' : 'Узнать больше и забронировать'}
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