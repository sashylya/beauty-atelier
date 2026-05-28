import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ posts }) {
    const deletePost = (id) => {
        if (confirm('Вы уверены, что хотите удалить эту статью?')) {
            router.delete(route('cosmetologist.posts.destroy', id));
        }
    };

    return (
        <BeautyLayout>
            <Head title="Мои статьи — Beauty Atelier" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <p className="uppercase tracking-[0.3em] text-[10px] font-semibold text-champagne-gold mb-4">Космо-блог</p>
                        <h1 className="font-serif italic text-6xl text-deep-espresso">Мои статьи</h1>
                    </div>
                    <Link 
                        href={route('cosmetologist.posts.create')}
                        className="bg-deep-espresso text-creamy-silk px-10 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-black transition-colors"
                    >
                        Написать статью
                    </Link>
                </div>

                <div className="bg-white border border-deep-espresso/5">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-deep-espresso/5 bg-[#FAF9F6]">
                                <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-deep-espresso/40">Название</th>
                                <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-deep-espresso/40">Категория</th>
                                <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-deep-espresso/40">Дата</th>
                                <th className="p-6 text-[10px] uppercase tracking-widest font-bold text-deep-espresso/40">Действия</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.data.map((post) => (
                                <tr key={post.id} className="border-b border-deep-espresso/5 hover:bg-[#FAF9F6]/50 transition-colors">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            {post.image_path && (
                                                <img src={`/storage/${post.image_path}`} className="w-12 h-12 object-cover border border-deep-espresso/5" />
                                            )}
                                            <span className="font-serif text-lg text-deep-espresso">{post.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className="text-[10px] uppercase tracking-widest font-bold text-champagne-gold px-3 py-1 bg-champagne-gold/5 border border-champagne-gold/10">
                                            {post.category === 'article' ? 'Статья' : post.category === 'news' ? 'Новость' : 'Факт'}
                                        </span>
                                    </td>
                                    <td className="p-6 text-xs text-gray-400">
                                        {new Date(post.published_at).toLocaleDateString('ru-RU')}
                                    </td>
                                    <td className="p-6">
                                        <div className="flex gap-6">
                                            <Link 
                                                href={route('cosmetologist.posts.edit', post.id)}
                                                className="text-[9px] uppercase tracking-widest font-bold text-deep-espresso hover:text-champagne-gold transition-colors"
                                            >
                                                Изменить
                                            </Link>
                                            <button 
                                                onClick={() => deletePost(post.id)}
                                                className="text-[9px] uppercase tracking-widest font-bold text-red-800/40 hover:text-red-800 transition-colors"
                                            >
                                                Удалить
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Пагинация */}
                {posts.links.length > 3 && (
                    <div className="mt-12 flex justify-center gap-2">
                        {posts.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`px-4 py-2 text-[10px] uppercase tracking-widest font-bold transition-all ${
                                    link.active 
                                        ? 'bg-deep-espresso text-creamy-silk' 
                                        : 'text-deep-espresso/40 hover:text-deep-espresso'
                                } ${!link.url ? 'opacity-20 cursor-default' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label.replace('Previous', 'Назад').replace('Next', 'Вперед') }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </BeautyLayout>
    );
}
