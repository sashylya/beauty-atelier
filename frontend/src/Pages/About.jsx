import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <BeautyLayout>
            <Head title="Наша история — Beauty Atelier" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-40">
                    <div className="space-y-12">
                        <p className="uppercase tracking-[0.5em] text-[10px] font-bold text-champagne-gold">С 2025 года</p>
                        <h1 className="font-serif italic text-7xl text-deep-espresso leading-tight">Современные <br/> Алхимики</h1>
                        <p className="text-xl text-deep-espresso/60 font-light italic leading-loose">
                            Beauty Atelier родился из простой, но радикальной идеи: макияж должен быть таким же личным, как костюм, сшитый на заказ.
                            В мире массового производства мы вернулись в лабораторию, чтобы возродить искусство индивидуальности.
                        </p>
                    </div>
                    <div className="aspect-[4/5] bg-[#EAE0D5] relative overflow-hidden group shadow-xl border border-[#3D2B1F]/5">
                        <img 
                            src="/images/about-alchemy.png" 
                            className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                            alt="Modern Alchemists Laboratory"
                        />
                        <div className="absolute inset-0 bg-[#3D2B1F]/10 group-hover:bg-transparent transition-colors duration-700"></div>
                        <div className="absolute inset-0 border-[1px] border-white/20 m-6 pointer-events-none"></div>
                        <div className="absolute bottom-10 left-10">
                            <span className="font-serif italic text-white/60 text-5xl lg:text-6xl select-none block drop-shadow-sm">Наше Ателье</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-deep-espresso/10 pt-24 mb-40">
                    <div className="space-y-6">
                        <span className="font-serif italic text-4xl text-champagne-gold">01.</span>
                        <h3 className="uppercase tracking-[0.3em] text-[11px] font-bold">Лаборатория</h3>
                        <p className="text-sm text-deep-espresso/60 leading-relaxed font-light italic">
                            Каждая формула начинается в нашей московской студии, где пигменты измельчаются вручную и тестируются на естественное сияние кожи.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <span className="font-serif italic text-4xl text-champagne-gold">02.</span>
                        <h3 className="uppercase tracking-[0.3em] text-[11px] font-bold">Ремесло</h3>
                        <p className="text-sm text-deep-espresso/60 leading-relaxed font-light italic">
                            Мы верим в движение "медленной красоты". Наши продукты производятся небольшими партиями, чтобы гарантировать высочайшую концентрацию активных растительных компонентов.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <span className="font-serif italic text-4xl text-champagne-gold">03.</span>
                        <h3 className="uppercase tracking-[0.3em] text-[11px] font-bold">Видение</h3>
                        <p className="text-sm text-deep-espresso/60 leading-relaxed font-light italic">
                            Дать каждому возможность стать своим собственным мастером-художником, предоставляя инструменты и знания для создания образа, который уникален именно для него.
                        </p>
                    </div>
                </div>

                <div className="bg-deep-espresso text-creamy-silk p-20 lg:p-32 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-champagne-gold"></div>
                    <p className="font-serif italic text-4xl lg:text-5xl mb-12 max-w-4xl mx-auto leading-relaxed">
                        "Элегантность — это не когда вас замечают, это когда вас запоминают."
                    </p>
                    <div className="flex justify-center space-x-6 items-center">
                        <div className="h-px w-8 bg-creamy-silk/20"></div>
                        <span className="uppercase tracking-[0.5em] text-[9px] font-bold opacity-60">Философия Ателье</span>
                        <div className="h-px w-8 bg-creamy-silk/20"></div>
                    </div>
                </div>
            </div>
        </BeautyLayout>
    );
}
