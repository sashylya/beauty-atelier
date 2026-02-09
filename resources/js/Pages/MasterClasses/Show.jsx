import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Show({ masterClass, auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        tickets: 1,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('master-classes.book', masterClass.id), {
            onSuccess: () => {
                alert('Бронирование подтверждено. Добро пожаловать в Ателье.');
                reset();
            },
        });
    };

    const date = new Date(masterClass.date_time);

    return (
        <BeautyLayout>
            <Head title={`${masterClass.title} — Beauty Atelier`} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                    
                    {/* Left Side: Content (7/12) */}
                    <div className="lg:col-span-7">
                        <Link href={route('master-classes.index')} className="uppercase tracking-[0.4em] text-[9px] font-bold text-deep-espresso/40 hover:text-champagne-gold transition mb-12 inline-block">
                            ← Назад к мастер-классам
                        </Link>
                        
                        <div className="mb-16">
                            <p className="uppercase tracking-[0.4em] text-[10px] font-bold text-champagne-gold mb-6">новое событие</p>
                            <h1 className="font-serif italic text-6xl lg:text-7xl text-deep-espresso mb-10 leading-tight">
                                {masterClass.title}
                            </h1>
                            <div className="flex flex-wrap gap-x-12 gap-y-6 py-10 border-y border-deep-espresso/10">
                                <div>
                                    <p className="uppercase tracking-[0.3em] text-[8px] font-black text-deep-espresso/30 mb-2">Дата и Время</p>
                                    <p className="font-serif italic text-xl">
                                        {date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })} в {date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                                <div>
                                    <p className="uppercase tracking-[0.3em] text-[8px] font-black text-deep-espresso/30 mb-2">Локация</p>
                                    <p className="font-serif italic text-xl">{masterClass.location}</p>
                                </div>
                                <div>
                                    <p className="uppercase tracking-[0.3em] text-[8px] font-black text-deep-espresso/30 mb-2">Цена</p>
                                    <p className="font-serif italic text-xl">{masterClass.price.toLocaleString()} ₽</p>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-neutral max-w-none">
                            <p className="text-xl text-deep-espresso/70 leading-relaxed font-light italic mb-12">
                                {masterClass.description}
                            </p>
                            
                            {masterClass.program && (
                                <>
                                    <h3 className="font-serif italic text-3xl mb-6">Программа</h3>
                                    <ul className="space-y-6 text-deep-espresso/60 font-light list-none p-0">
                                        {masterClass.program.split('\n').filter(item => item.trim() !== '').map((item, index) => (
                                            <li key={index} className="flex items-start gap-6 pb-6 border-b border-deep-espresso/5">
                                                <span className="text-champagne-gold font-serif italic text-2xl">
                                                    {(index + 1).toString().padStart(2, '0')}.
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Side: Booking Card (5/12) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-40">
                        <div className="bg-white p-12 shadow-2xl relative overflow-hidden">
                             {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-creamy-silk -rotate-45 translate-x-16 -translate-y-16"></div>
                            
                            <h3 className="font-serif italic text-3xl mb-8">Забронировать место</h3>
                            
                            <form onSubmit={submit} className="space-y-8">
                                <div>
                                    <label className="block uppercase tracking-[0.3em] text-[9px] font-bold text-deep-espresso/40 mb-4">
                                        Количество гостей
                                    </label>
                                    <div className="flex items-center border border-deep-espresso/10 p-2">
                                        <button 
                                            type="button"
                                            onClick={() => setData('tickets', Math.max(1, data.tickets - 1))}
                                            className="w-12 h-12 flex items-center justify-center hover:bg-creamy-silk transition"
                                        >
                                            —
                                        </button>
                                        <input 
                                            type="number" 
                                            value={data.tickets}
                                            readOnly
                                            className="flex-1 text-center border-none focus:ring-0 font-serif italic text-xl"
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => setData('tickets', data.tickets + 1)}
                                            className="w-12 h-12 flex items-center justify-center hover:bg-creamy-silk transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                    {errors.tickets && <p className="mt-2 text-[10px] text-red-500 uppercase tracking-widest">{errors.tickets}</p>}
                                </div>

                                <div className="py-8 border-t border-deep-espresso/5 flex justify-between items-baseline">
                                    <span className="uppercase tracking-[0.3em] text-[10px] font-bold">Итого</span>
                                    <span className="text-3xl font-light">{(data.tickets * masterClass.price).toLocaleString()} ₽</span>
                                </div>

                                {auth.user ? (
                                    <button 
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-deep-espresso text-creamy-silk uppercase tracking-[0.4em] text-[11px] font-bold py-6 hover:bg-champagne-gold transition-all duration-500"
                                    >
                                        {processing ? 'Обработка...' : 'Подтвердить бронь'}
                                    </button>
                                ) : (
                                    <Link 
                                        href={route('login')}
                                        className="block w-full text-center bg-deep-espresso text-creamy-silk uppercase tracking-[0.4em] text-[11px] font-bold py-6 hover:bg-champagne-gold transition-all duration-500"
                                    >
                                        Войти для бронирования
                                    </Link>
                                )}
                                
                                <p className="text-[9px] text-center uppercase tracking-[0.2em] text-deep-espresso/40 leading-relaxed">
                                    Бронируя, вы соглашаетесь с <br/> 
                                    <span className="underline cursor-pointer">Правилами отмены Ателье</span>.
                                </p>
                            </form>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-xs italic text-deep-espresso/40">
                                Нужна индивидуальная консультация? <br/>
                                <span className="text-champagne-gold uppercase tracking-[0.2em] font-bold cursor-pointer hover:underline">Связаться с нами</span>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </BeautyLayout>
    );
}