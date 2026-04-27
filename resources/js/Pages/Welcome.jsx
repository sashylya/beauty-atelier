import React, { useState, useRef } from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, look, hitProducts, latestPosts }) {
    const [activeShade, setActiveShade] = useState(0);
    const sliderRef = useRef(null);

    const shades = [
        { id: 0, color: '#bc0000', name: 'Velvet Red', image: '/images/lipstick-red.png' },
        { id: 1, color: '#C68E68', name: 'Terra Cotta', image: '/images/lipstick-nude.png' },
        { id: 2, color: '#8F5850', name: 'Mauve Dust', image: '/images/lipstick-brown.png' },
    ];

    const scrollSlider = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.offsetWidth * 0.8;
            sliderRef.current.scrollBy({
                left: direction === 'next' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <BeautyLayout>
            <Head title="Beauty Atelier — Искусство цвета" />

            {/* 1. Hero Section */}
            <section className="relative h-screen min-h-[700px] flex items-center bg-white overflow-hidden">
                <div className="max-w-[1400px] w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative z-10 pl-10 md:pl-20">
                        <p className="text-[11px] uppercase tracking-[0.4em] text-[#C8A47E] mb-12 font-medium">Новая эра бьюти индустрии</p>
                        <h1 className="leading-none mb-10">
                            <span className="font-serif text-[80px] md:text-[100px] text-black block tracking-tight">ОБЪЕКТ</span>
                            <span className="font-serif italic text-[80px] md:text-[100px] text-[#5D2E18] block ml-0 md:ml-32">ЖЕЛАНИЯ</span>
                        </h1>
                        <p className="text-sm uppercase tracking-[0.1em] text-gray-500 max-w-md mb-16 leading-relaxed font-medium">
                            ваша коллекция - это ваше <br/>
                            вложение в искусство самовыражения. <br/>
                            мы создаем идеальную посадку цвета
                        </p>
                        <div className="flex flex-wrap gap-8">
                            <Link href="/catalog" className="inline-block border border-[#C8A47E] text-[#5D2E18] uppercase tracking-[0.15em] text-[10px] font-bold px-12 py-4 hover:bg-[#FDF5E6] transition-all min-w-[180px] text-center">в каталог</Link>
                            <Link href="/master-classes" className="inline-block bg-[#8B5A2B] border border-[#8B5A2B] text-white uppercase tracking-[0.15em] text-[10px] font-bold px-12 py-4 hover:bg-[#6F4E37] transition-all min-w-[180px] text-center">мастер-классы</Link>
                        </div>
                    </div>
                    <div className="relative h-full flex items-center justify-center">
                        <div className="relative w-full max-w-[550px] aspect-square transition-all duration-700 ease-in-out">
                            <img key={activeShade} src={shades[activeShade].image} alt={shades[activeShade].name} className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.1)] animate-in fade-in duration-500" />
                        </div>
                        <div className="absolute bottom-10 right-10 md:right-0 bg-white/50 backdrop-blur-sm border border-[#C8A47E]/20 p-4 flex gap-4 shadow-xl rounded-sm">
                            <div className="flex gap-4 border border-[#C8A47E]/40 p-2">
                                {shades.map((shade, index) => (
                                    <button key={shade.id} onMouseEnter={() => setActiveShade(index)} className={`w-10 h-10 rounded-full border-2 transition-all duration-500 ${activeShade === index ? 'border-black scale-110 shadow-lg' : 'border-transparent opacity-80 hover:opacity-100 hover:scale-105'}`} style={{ backgroundColor: shade.color, boxShadow: activeShade === index ? `0 0 15px ${shade.color}80` : 'none' }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Look of the Month */}
            <section className="bg-[#FFF5F0] relative">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
                        <div className="relative h-[400px] md:h-auto overflow-hidden flex items-center justify-center">
                            <img src={look?.image_path ? `/storage/${look.image_path}` : "/images/model-look.png"} alt="Look of the Month" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 hover:scale-105" />
                            {look?.hotspots?.map((h) => (
                                <div key={h.id} className="absolute group cursor-pointer z-10" style={{ left: `${h.x}%`, top: `${h.y}%` }}>
                                    <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-white/50 transition-all duration-500 hover:scale-110 shadow-sm">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.9)]"></div>
                                    </div>
                                    <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-20">
                                        <span className="bg-white/90 backdrop-blur px-3 py-1 text-[11px] uppercase tracking-widest text-[#5D2E18] shadow-lg border border-[#D4AF37]/20">{h.label}</span>
                                    </div>
                                    {h.product_slug && <Link href={route('catalog.show', h.product_slug)} className="absolute inset-0 z-10" />}
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col justify-center p-10 md:p-16 lg:pl-24 bg-[#FFF5F0]">
                            <p className="uppercase tracking-[0.4em] text-[9px] font-bold text-[#8B5A2B] mb-8">Выбор косметолога</p>
                            <h3 className="font-serif text-5xl lg:text-6xl text-[#4A4A4A] mb-8">{look?.title || 'Образ месяца'}</h3>
                            <p className="text-sm text-gray-500 leading-7 mb-12 max-w-sm font-light">{look?.description}</p>
                            <div className="h-px w-16 bg-[#D4AF37] mb-12"></div>
                            <div className="w-full max-w-sm space-y-8 mb-12">
                                {look?.hotspots?.map((h) => (
                                    <Link key={h.id} href={h.product_slug ? route('catalog.show', h.product_slug) : '#'} className="flex justify-between items-center group text-[#5D2E18]">
                                        <span className="uppercase tracking-[0.25em] text-[13px] font-medium group-hover:text-[#8B5A2B] transition-colors">{h.label}</span>
                                        <span className="text-[#D4AF37] opacity-60 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                                            <svg width="40" height="10" viewBox="0 0 40 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 5H39M39 5L34 1M39 5L34 9" stroke="currentColor" strokeWidth="0.5"/></svg>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                            <div><Link href="/catalog" className="inline-block border border-[#C8A47E] text-[#5D2E18] uppercase tracking-[0.2em] text-[8px] font-bold px-12 py-4 hover:bg-[#C8A47E] hover:text-white transition-all duration-300">в каталог</Link></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Best Sellers Slider (DYNAMIC) */}
            <section className="py-32 bg-white overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex justify-between items-end mb-20">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] mb-4 font-bold">Самое любимое</p>
                            <h2 className="font-serif text-5xl text-[#3D2B1F]">Хиты продаж</h2>
                        </div>
                        {hitProducts && hitProducts.length > 3 && (
                            <div className="flex gap-4">
                                <button onClick={() => scrollSlider('prev')} className="w-12 h-12 rounded-full border border-[#3D2B1F]/10 flex items-center justify-center hover:bg-[#3D2B1F] hover:text-white transition-all">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button onClick={() => scrollSlider('next')} className="w-12 h-12 rounded-full border border-[#3D2B1F]/10 flex items-center justify-center hover:bg-[#3D2B1F] hover:text-white transition-all">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        )}
                    </div>

                    <div 
                        ref={sliderRef}
                        className={`flex gap-10 overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-smooth pb-10 ${hitProducts && hitProducts.length <= 3 ? 'justify-center' : ''}`}
                    >
                        {hitProducts && hitProducts.map((product) => (
                            <div key={product.id} className="w-[240px] md:w-[280px] lg:w-[300px] flex-shrink-0 snap-start group">
                                 <Link href={route('catalog.show', product.slug)} className="block">
                                    <div className="aspect-[4/5] bg-[#F2F2F2] flex items-center justify-center mb-8 overflow-hidden relative border border-[#3D2B1F]/5 shadow-sm">
                                        {product.image_path ? (
                                            <img 
                                                src={`/storage/${product.image_path}`} 
                                                alt={product.name} 
                                                className="w-full h-full object-contain p-6 transition-transform duration-1000 group-hover:scale-105" 
                                            />
                                        ) : (
                                            <div className="font-serif italic text-4xl opacity-5 uppercase tracking-widest">{product.category}</div>
                                        )}
                                    </div>
                                    <div className="text-center px-4">
                                        <p className="text-[8px] uppercase tracking-[0.3em] text-[#D4AF37] mb-3 font-bold">{product.category}</p>
                                        <h4 className="font-serif italic text-2xl text-[#3D2B1F] mb-4 transition-colors group-hover:text-[#8B5A2B]">{product.name}</h4>
                                        <p className="text-[9px] uppercase tracking-widest font-bold text-[#3D2B1F]/30 group-hover:text-[#3D2B1F] transition-colors border-b border-transparent group-hover:border-[#3D2B1F]/10 inline-block pb-1">Посмотреть</p>
                                    </div>
                                 </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Visit Atelier (Dark) */}
            <section className="bg-[#6F3C28] py-40 text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <p className="uppercase tracking-[0.3em] text-[10px] font-bold text-[#D4AF37] mb-8">Уникальный опыт</p>
                    <h2 className="font-serif text-6xl text-white mb-12">Посетите <br/> Ателье</h2>
                    <p className="text-white/70 font-light max-w-xl mx-auto mb-16 leading-relaxed text-sm">
                        За продуктом стоит процесс. Присоединяйтесь к нашим
                        мастерам-колористам на закрытых сессиях в центре
                        Москвы.
                    </p>
                    <div className="flex justify-center">
                        <Link 
                            href="/master-classes" 
                            className="inline-block border border-[#D4AF37] text-white uppercase tracking-[0.2em] text-[10px] font-bold px-12 py-5 hover:bg-white hover:text-[#6F3C28] transition-all duration-500 shadow-2xl"
                        >
                            записаться на мастер-класс
                        </Link>
                    </div>
                </div>
            </section>

            {/* 6. Diary */}
            <section className="py-32 bg-white">
                <div className="max-w-[1400px] mx-auto px-6">
                    <div className="flex justify-between items-end mb-20 border-b border-gray-100 pb-8">
                        <h2 className="font-serif text-5xl text-[#4A4A4A]">Дневник <br/> Ателье</h2>
                        <Link href={route('blog.index')} className="uppercase tracking-[0.2em] text-[10px] font-bold text-gray-400 hover:text-[#8B5A2B] transition mb-2">Подписаться на космо-блог</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {latestPosts && latestPosts.map((post) => (
                            <Link key={post.id} href={route('blog.show', post.slug)} className="group">
                                <div className="aspect-square bg-[#FAF9F6] border border-[#3D2B1F]/5 mb-8 overflow-hidden relative">
                                    {post.image_path ? (
                                        <img 
                                            src={`/storage/${post.image_path}`} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center font-serif italic text-4xl opacity-10 uppercase tracking-widest">BA</div>
                                    )}
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                                <p className="text-center text-[10px] uppercase tracking-[0.15em] text-gray-500 max-w-[200px] mx-auto leading-relaxed group-hover:text-black transition">
                                    {post.title}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </BeautyLayout>
    );
}
