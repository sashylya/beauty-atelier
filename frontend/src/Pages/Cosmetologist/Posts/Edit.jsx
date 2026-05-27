import React, { useState } from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Edit({ post, products }) {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, setData, post: postRequest, processing, errors } = useForm({
        _method: 'PATCH',
        title: post.title || '',
        category: post.category || 'article',
        excerpt: post.excerpt || '',
        content: post.content || '',
        recommended_products: post.recommended_products || [],
        image: null,
    });

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        postRequest(route('cosmetologist.posts.update', post.id));
    };

    const toggleProduct = (id) => {
        const current = [...data.recommended_products];
        if (current.includes(id)) {
            setData('recommended_products', current.filter(pid => pid !== id));
        } else {
            setData('recommended_products', [...current, id]);
        }
    };

    const quillModules = {
        toolbar: [
            [{ 'header': [2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['link', 'clean']
        ],
    };

    return (
        <BeautyLayout>
            <Head title={`Редактирование: ${post.title}`} />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="mb-12">
                    <Link href={route('cosmetologist.posts.index')} className="text-[10px] uppercase tracking-widest font-bold text-deep-espresso/40 hover:text-deep-espresso mb-8 block transition-colors">← К списку статей</Link>
                    <h1 className="font-serif italic text-6xl text-deep-espresso">Редактировать пост</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="space-y-8">
                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-deep-espresso/40 mb-3">Заголовок</label>
                            <input 
                                type="text"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="w-full bg-[#FAF9F6] border-none p-6 font-serif text-2xl focus:ring-1 focus:ring-champagne-gold"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-deep-espresso/40 mb-3">Категория</label>
                                <select 
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className="w-full bg-[#FAF9F6] border-none p-4 text-xs uppercase tracking-widest font-bold"
                                >
                                    <option value="article">Статья</option>
                                    <option value="news">Новость</option>
                                    <option value="fact">Факт</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold text-deep-espresso/40 mb-3">Сменить изображение</label>
                                <input 
                                    type="file"
                                    onChange={e => setData('image', e.target.files[0])}
                                    className="w-full text-xs text-gray-500 file:mr-4 file:py-4 file:px-8 file:border-0 file:text-[10px] file:uppercase file:tracking-widest file:font-bold file:bg-champagne-gold/10 file:text-champagne-gold"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-deep-espresso/40 mb-3">Краткое описание</label>
                            <textarea 
                                value={data.excerpt}
                                onChange={e => setData('excerpt', e.target.value)}
                                className="w-full bg-[#FAF9F6] border-none p-6 text-sm font-light h-32"
                            />
                        </div>

                        <div className="pb-12">
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-deep-espresso/40 mb-3">Содержание</label>
                            <div className="bg-[#FAF9F6] min-h-[400px]">
                                <ReactQuill 
                                    theme="snow"
                                    value={data.content}
                                    onChange={content => setData('content', content)}
                                    modules={quillModules}
                                    className="h-80"
                                />
                            </div>
                        </div>

                        <div className="pt-8">
                            <label className="block text-[10px] uppercase tracking-widest font-bold text-deep-espresso/40 mb-6">Рекомендовать товары</label>
                            
                            <div className="mb-6">
                                <input 
                                    type="text"
                                    placeholder="Поиск товаров..."
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="w-full bg-[#FAF9F6] border border-deep-espresso/10 p-4 text-xs uppercase tracking-widest font-bold focus:ring-1 focus:ring-champagne-gold transition-all"
                                />
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 h-96 overflow-y-auto p-4 border border-deep-espresso/5 bg-[#FAF9F6]">
                                {filteredProducts.map(product => (
                                    <button
                                        key={product.id}
                                        type="button"
                                        onClick={() => toggleProduct(product.id)}
                                        className={`group relative p-4 flex flex-col items-center border transition-all duration-300 ${
                                            data.recommended_products.includes(product.id)
                                                ? 'bg-white border-champagne-gold shadow-md'
                                                : 'bg-white/50 border-transparent hover:border-deep-espresso/10'
                                        }`}
                                    >
                                        <div className="w-full aspect-square bg-[#F0F0F0] mb-3 overflow-hidden">
                                            {product.image_path ? (
                                                <img src={`/storage/${product.image_path}`} alt={product.name} className="w-full h-full object-contain p-2" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-300">Нет фото</div>
                                            )}
                                        </div>
                                        <span className={`text-[8px] uppercase tracking-widest font-bold text-center leading-tight ${
                                            data.recommended_products.includes(product.id) ? 'text-deep-espresso' : 'text-deep-espresso/40'
                                        }`}>
                                            {product.name}
                                        </span>
                                        {data.recommended_products.includes(product.id) && (
                                            <div className="absolute top-2 right-2 w-4 h-4 bg-champagne-gold rounded-full flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="w-2.5 h-2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        disabled={processing}
                        className="w-full bg-deep-espresso text-creamy-silk py-6 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-black transition-all shadow-xl disabled:opacity-50"
                    >
                        {processing ? 'Сохранение...' : 'Обновить статью'}
                    </button>
                </form>
            </div>
            
            <style dangerouslySetInnerHTML={{ __html: `
                .ql-container { font-family: inherit; font-size: 14px; }
                .ql-toolbar { border: none !important; background: #f0f0f0; }
                .ql-container { border: none !important; }
                .ql-editor { min-height: 320px; font-weight: 300; line-height: 1.8; }
            `}} />
        </BeautyLayout>
    );
}
