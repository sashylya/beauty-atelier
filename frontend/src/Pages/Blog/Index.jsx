import React, { useState } from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ posts, filters, cosmetologists }) {
    const [hoveredId, setHoveredId] = useState(null);

    const categories = [
        { id: 'article', name: 'Статьи' },
        { id: 'news', name: 'Новости' },
        { id: 'fact', name: 'Факты' },
    ];

    const colors = ['bg-[#8B5A2B]', 'bg-[#5D2E18]', 'bg-[#C8A47E]', 'bg-[#4A4A4A]'];

    return (
        <BeautyLayout>
            <Head title="Космо-блог — Beauty Atelier" />
            
            {/* Interactive Cosmetologists Block */}
            {cosmetologists && cosmetologists.length > 0 && (
                <section className="h-[70vh] min-h-[500px] w-full flex overflow-hidden border-b border-deep-espresso/10">
                    {cosmetologists.map((cosmo, index) => (
                        <div 
                            key={cosmo.id}
                            onMouseEnter={() => setHoveredId(cosmo.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className={`relative h-full transition-all duration-1000 ease-in-out cursor-pointer overflow-hidden flex-1 ${
                                hoveredId === cosmo.id ? 'flex-[1.8]' : 'flex-1'
                            } ${hoveredId !== null && hoveredId !== cosmo.id ? 'opacity-40 grayscale' : 'opacity-100 grayscale-0'}`}
                        >
                            {/* Background Color Overlay */}
                            <div className={`absolute inset-0 z-10 opacity-20 ${colors[index % colors.length]}`}></div>
                            
                            {/* Image */}
                            <img 
                                src={cosmo.avatar ? `/storage/${cosmo.avatar}` : `https://api.dicebear.com/7.x/avataaars/svg?seed=${cosmo.name}`} 
                                alt={cosmo.name}
                                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000"
                                style={{ transform: 'scale(1)' }}
                            />

                            {/* Info Overlay */}
                            <div className={`absolute inset-0 z-20 flex flex-col justify-end p-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 ${hoveredId === cosmo.id ? 'opacity-100' : 'opacity-80'}`}>
                                <div className={`transition-all duration-700 transform ${hoveredId === cosmo.id ? 'translate-y-0' : 'translate-y-12'}`}>
                                    <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-champagne-gold mb-4 opacity-80">Эксперт Ателье</p>
                                    <h2 className="font-serif italic text-4xl lg:text-5xl text-white mb-6 leading-none">{cosmo.name}</h2>
                                    
                                    <div className={`overflow-hidden transition-all duration-700 ease-in-out ${hoveredId === cosmo.id ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-creamy-silk uppercase tracking-[0.2em] text-[11px] font-bold mb-6 border-b border-creamy-silk/20 pb-4 inline-block">{cosmo.specialization}</p>
                                        <p className="text-white/70 text-sm leading-relaxed font-light mb-10 max-w-md line-clamp-4 italic">
                                            "{cosmo.biography}"
                                        </p>
                                        <div className="flex gap-4">
                                            <Link 
                                                href={route('blog.index', { author_id: cosmo.id })} 
                                                className="bg-creamy-silk text-deep-espresso uppercase tracking-[0.2em] text-[10px] font-bold px-8 py-4 hover:bg-white transition-colors"
                                            >
                                                Статьи автора
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <header className="mb-20">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
                        <div>
                            <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-champagne-gold mb-4">Дневник ателье</p>
                            <h1 className="font-serif italic text-6xl text-deep-espresso">Космо-блог</h1>
                        </div>
                        <div className="flex flex-wrap gap-x-10 gap-y-4 uppercase tracking-[0.2em] text-[10px] font-semibold text-deep-espresso/40">
                            <Link href={route('blog.index')} className={!filters.category && !filters.author_id ? 'text-deep-espresso border-b border-deep-espresso' : 'hover:text-deep-espresso transition'}>Все</Link>
                            {categories.map(cat => (
                                <Link 
                                    key={cat.id}
                                    href={route('blog.index', { category: cat.id })} 
                                    className={filters.category === cat.id ? 'text-deep-espresso border-b border-deep-espresso' : 'hover:text-deep-espresso transition'}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                            {filters.author_id && (
                                <div className="text-deep-espresso border-b border-deep-espresso flex items-center gap-2">
                                    <span>Автор: {cosmetologists.find(c => c.id == filters.author_id)?.name || '...'}</span>
                                    <Link href={route('blog.index')} className="text-red-800/40 hover:text-red-800 ml-2">✕</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                    {posts.data.map((post) => (
                        <div key={post.id} className="group">
                            <Link href={route('blog.show', post.slug)}>
                                <div className="aspect-square overflow-hidden bg-[#F9F9F9] mb-6 relative border border-deep-espresso/5">
                                    {post.image_path ? (
                                        <img 
                                            src={`/storage/${post.image_path}`} 
                                            alt={post.title} 
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-[#FAF9F6]">
                                             <span className="font-serif italic text-neutral-200 text-6xl opacity-50">BA</span>
                                        </div>
                                    )}
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-deep-espresso text-[8px] uppercase tracking-[0.3em] px-3 py-1.5 font-bold">
                                        {post.category === 'article' ? 'Статья' : post.category === 'news' ? 'Новость' : 'Факт'}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-champagne-gold mb-2 font-bold">
                                        {new Date(post.published_at || post.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </p>
                                    <h3 className="font-serif text-2xl text-deep-espresso mb-3 group-hover:text-champagne-gold transition-colors duration-300 leading-tight">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 font-light mb-4">
                                        {post.excerpt}
                                    </p>
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold border-b border-deep-espresso/10 pb-1 group-hover:border-champagne-gold transition-colors">Читать далее</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {posts.links.length > 3 && (
                    <div className="mt-20 flex justify-center gap-2">
                        {posts.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${
                                    link.active 
                                        ? 'bg-deep-espresso text-creamy-silk' 
                                        : 'text-deep-espresso/40 hover:text-deep-espresso'
                                } ${!link.url ? 'opacity-20 cursor-default' : ''}`}
                                dangerouslySetInnerHTML={{ 
                                    __html: link.label
                                        .replace('Previous', 'Назад')
                                        .replace('Next', 'Вперед')
                                }}
                            />
                        ))}
                    </div>
                )}

                {posts.data.length === 0 && (
                    <div className="py-40 text-center">
                        <p className="font-serif italic text-2xl text-deep-espresso/40 tracking-widest">Записей пока нет</p>
                    </div>
                )}
            </div>
        </BeautyLayout>
    );
}
