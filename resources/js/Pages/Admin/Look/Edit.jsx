import React, { useState, useRef } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ look, products }) {
    const [hotspots, setHotspots] = useState(look.hotspots || []);
    const imgRef = useRef(null);

    const { data, setData, post, processing, errors } = useForm({
        title: look.title,
        description: look.description,
        hotspots: look.hotspots,
        image: null,
        _method: 'POST',
    });

    const handleImageClick = (e) => {
        const rect = imgRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        const newHotspot = {
            id: Date.now(),
            x: x.toFixed(2),
            y: y.toFixed(2),
            product_id: products[0]?.id || '',
            label: products[0]?.name || 'Продукт'
        };

        const updated = [...hotspots, newHotspot];
        setHotspots(updated);
        setData('hotspots', updated);
    };

    const updateHotspot = (id, field, value) => {
        const updated = hotspots.map(h => {
            if (h.id === id) {
                const newH = { ...h, [field]: value };
                if (field === 'product_id') {
                    const product = products.find(p => p.id == value);
                    newH.label = product ? product.name : h.label;
                }
                return newH;
            }
            return h;
        });
        setHotspots(updated);
        setData('hotspots', updated);
    };

    const removeHotspot = (id) => {
        const updated = hotspots.filter(h => h.id !== id);
        setHotspots(updated);
        setData('hotspots', updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.look.update'));
    };

    return (
        <AdminLayout>
            <Head title="Редактор образа месяца" />
            
            <div className="mb-12">
                <h1 className="font-serif text-4xl italic text-[#3D2B1F]">Редактор образа месяца</h1>
                <p className="text-sm text-[#3D2B1F]/60 mt-2">Загрузите фото и кликните по нему, чтобы расставить точки товаров.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Левая колонка: Фото и Точки */}
                <div className="lg:col-span-7">
                    <div className="bg-white p-4 shadow-sm border border-[#3D2B1F]/5 relative">
                        <div className="mb-4">
                            <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Фото модели</label>
                            <input 
                                type="file" 
                                onChange={e => setData('image', e.target.files[0])}
                                className="text-xs"
                            />
                        </div>

                        <div className="relative cursor-crosshair overflow-hidden group" onClick={handleImageClick}>
                            <img 
                                ref={imgRef}
                                src={data.image ? URL.createObjectURL(data.image) : (look.image_path ? `/storage/${look.image_path}` : '/images/model-look.png')} 
                                className="w-full h-auto"
                                alt="Look Editor"
                            />
                            
                            {/* Отрисовка точек */}
                            {hotspots.map(h => (
                                <div 
                                    key={h.id}
                                    className="absolute w-6 h-6 -ml-3 -mt-3 bg-white/30 backdrop-blur-md rounded-full border border-white flex items-center justify-center shadow-xl pointer-events-none"
                                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                                >
                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Правая колонка: Настройки текста и список товаров */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-white p-8 shadow-sm border border-[#3D2B1F]/5">
                        <h2 className="text-[10px] uppercase tracking-[0.3em] font-black mb-6 opacity-30">Текстовый блок</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Заголовок</label>
                                <input 
                                    type="text" 
                                    value={data.title} 
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full border-[#3D2B1F]/10 p-3 text-sm focus:border-[#D4AF37] focus:ring-0"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Описание</label>
                                <textarea 
                                    value={data.description} 
                                    onChange={e => setData('description', e.target.value)}
                                    className="w-full border-[#3D2B1F]/10 p-3 text-sm focus:border-[#D4AF37] focus:ring-0 h-32"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 shadow-sm border border-[#3D2B1F]/5">
                        <h2 className="text-[10px] uppercase tracking-[0.3em] font-black mb-6 opacity-30">Активные точки ({hotspots.length})</h2>
                        <div className="space-y-6">
                            {hotspots.map((h, index) => (
                                <div key={h.id} className="p-4 bg-[#FDF5E6]/50 border border-[#3D2B1F]/5 relative group">
                                    <button 
                                        type="button"
                                        onClick={() => removeHotspot(h.id)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                                    >✕</button>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[8px] uppercase tracking-widest font-bold mb-1">Координаты</label>
                                            <div className="text-[10px] text-gray-400 font-mono">X: {h.x}% | Y: {h.y}%</div>
                                        </div>
                                        <div>
                                            <label className="block text-[8px] uppercase tracking-widest font-bold mb-1">Товар</label>
                                            <select 
                                                value={h.product_id}
                                                onChange={e => updateHotspot(h.id, 'product_id', e.target.value)}
                                                className="w-full border-[#3D2B1F]/10 p-1 text-[10px] focus:ring-0"
                                            >
                                                {products.map(p => (
                                                    <option key={p.id} value={p.id}>{p.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {hotspots.length === 0 && <p className="text-xs text-center text-gray-400 italic">Нажмите на фото, чтобы добавить точку</p>}
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={processing}
                        className="w-full bg-[#3D2B1F] text-white uppercase tracking-[0.3em] text-[10px] font-bold py-5 hover:bg-[#8B5A2B] transition-all duration-500 shadow-xl shadow-[#3D2B1F]/20 disabled:opacity-50"
                    >
                        {processing ? 'Сохранение...' : 'Обновить образ на сайте'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
