import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ post, recentPosts, recommendedProducts }) {
    return (
        <BeautyLayout>
            <Head title={`${post.title} — Космо-блог`} />
            
            <article className="py-20">
                <header className="max-w-4xl mx-auto px-6 text-center mb-16">
                    <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-champagne-gold mb-8">
                        {post.category === 'article' ? 'Статья' : post.category === 'news' ? 'Новость' : 'Факт'} — {new Date(post.published_at || post.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <h1 className="font-serif text-5xl md:text-6xl text-deep-espresso mb-10 leading-tight">
                        {post.title}
                    </h1>
                    
                    {post.author && (
                        <div className="flex items-center justify-center gap-4 mb-10">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-champagne-gold/20 border border-champagne-gold/10">
                                {post.author.avatar ? (
                                    <img src={`/storage/${post.author.avatar}`} alt={post.author.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-champagne-gold font-bold text-xs">{post.author.name.charAt(0)}</span>
                                )}
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] uppercase tracking-widest font-bold text-deep-espresso">Автор: {post.author.name}</p>
                                <p className="text-[9px] text-gray-400 uppercase tracking-widest">{post.author.specialization}</p>
                            </div>
                        </div>
                    )}

                    <div className="h-px w-20 bg-champagne-gold mx-auto mb-10"></div>
                </header>

                <div className="max-w-6xl mx-auto px-6 mb-20">
                    <div className="aspect-[21/9] overflow-hidden bg-[#FAF9F6] border border-deep-espresso/5 shadow-sm">
                        {post.image_path ? (
                            <img 
                                src={`/storage/${post.image_path}`} 
                                alt={post.title} 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center opacity-10">
                                <span className="font-serif italic text-[120px]">BA</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="max-w-3xl mx-auto px-6">
                    <div 
                        className="prose prose-neutral max-w-none prose-headings:font-serif prose-headings:text-deep-espresso prose-p:text-gray-600 prose-p:leading-relaxed prose-p:text-lg prose-p:font-light mb-20"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Рекомендованные товары */}
                    {recommendedProducts && recommendedProducts.length > 0 && (
                        <div className="bg-[#FAF9F6] p-10 border border-champagne-gold/10 mb-20">
                            <h3 className="uppercase tracking-[0.3em] text-[11px] font-bold text-champagne-gold mb-10 text-center">Рекомендация специалиста</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                {recommendedProducts.map(product => (
                                    <Link key={product.id} href={route('catalog.show', product.slug)} className="flex items-center gap-6 group">
                                        <div className="w-24 h-24 bg-white flex-shrink-0 border border-deep-espresso/5 overflow-hidden">
                                            {product.image_path && (
                                                <img src={`/storage/${product.image_path}`} alt={product.name} className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform" />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="uppercase tracking-widest text-[10px] font-bold text-deep-espresso group-hover:text-champagne-gold transition-colors">{product.name}</h4>
                                            <p className="text-xs font-serif italic text-gray-400 mt-1">{parseFloat(product.price).toLocaleString()} ₽</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Биография автора */}
                    {post.author && post.author.biography && (
                        <div className="border-y border-deep-espresso/5 py-12 mb-20">
                            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                                <div className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden bg-deep-espresso text-creamy-silk text-2xl font-serif italic border border-deep-espresso/10 shadow-sm">
                                    {post.author.avatar ? (
                                        <img src={`/storage/${post.author.avatar}`} alt={post.author.name} className="w-full h-full object-cover" />
                                    ) : (
                                        post.author.name.charAt(0)
                                    )}
                                </div>
                                <div>
                                    <h4 className="uppercase tracking-[0.2em] text-[11px] font-bold text-deep-espresso mb-4">Об авторе</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed font-light mb-4">
                                        {post.author.biography}
                                    </p>
                                    <p className="text-[10px] uppercase tracking-widest font-bold text-champagne-gold">
                                        {post.author.specialization}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                        <Link href={route('blog.index')} className="text-[10px] uppercase tracking-[0.2em] font-bold text-deep-espresso/40 hover:text-deep-espresso transition-colors">
                            ← Назад в блог
                        </Link>
                    </div>
                </div>
            </article>

            {recentPosts && recentPosts.length > 0 && (
                <section className="py-24 bg-[#FAF9F6]">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="font-serif text-3xl text-deep-espresso mb-16 text-center">Другие записи</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {recentPosts.map((rPost) => (
                                <Link key={rPost.id} href={route('blog.show', rPost.slug)} className="group">
                                    <div className="aspect-square bg-white mb-6 overflow-hidden border border-deep-espresso/5">
                                        {rPost.image_path && (
                                            <img src={`/storage/${rPost.image_path}`} alt={rPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        )}
                                    </div>
                                    <h4 className="font-serif text-xl text-deep-espresso group-hover:text-champagne-gold transition-colors mb-2">{rPost.title}</h4>
                                    <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">{new Date(rPost.published_at || rPost.created_at).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </BeautyLayout>
    );
}
