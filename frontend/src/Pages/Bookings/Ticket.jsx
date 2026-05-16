import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Ticket({ booking, qrCodeUrl }) {
    return (
        <div className="min-h-screen bg-[#FAF9F6] py-12 px-4 flex flex-col items-center justify-center">
            <Head title={`Билет #${booking.ticket_code} — Beauty Atelier`} />

            <div className="max-w-md w-full bg-white shadow-2xl relative overflow-hidden">
                {/* Header Decoration */}
                <div className="h-2 bg-champagne-gold w-full"></div>
                
                <div className="p-10">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <img src="/images/logo.png" alt="Beauty Atelier" className="h-6 w-auto mb-4" />
                            <p className="uppercase tracking-[0.3em] text-[8px] font-bold text-champagne-gold">Входной билет</p>
                        </div>
                        <div className="text-right">
                            <p className="font-serif italic text-lg text-deep-espresso">#{booking.ticket_code}</p>
                            <p className="text-[8px] uppercase tracking-widest opacity-40">Номер бронирования</p>
                        </div>
                    </div>

                    <div className="space-y-8 mb-12">
                        <div>
                            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Мероприятие</p>
                            <h1 className="font-serif italic text-2xl text-deep-espresso leading-tight">
                                {booking.master_class.title}
                            </h1>
                        </div>

                        <div className="grid grid-cols-1 gap-8">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Дата и время</p>
                                <p className="font-medium text-sm">
                                    {new Date(booking.master_class.date_time).toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Локация</p>
                            <p className="font-medium text-sm italic font-serif">{booking.master_class.location}</p>
                        </div>

                        <div>
                            <p className="text-[10px] uppercase tracking-widest opacity-40 mb-2">Гость</p>
                            <p className="font-medium text-sm">{booking.user.name}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center border-t border-dashed border-deep-espresso/10 pt-10">
                        <div className="bg-white p-4 border border-deep-espresso/5 shadow-sm mb-4">
                            <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32" />
                        </div>
                        <p className="text-[9px] uppercase tracking-[0.2em] font-medium text-deep-espresso/40">Предъявите QR-код на входе</p>
                    </div>
                </div>

                {/* Footer Decoration */}
                <div className="bg-deep-espresso text-white p-6 text-center">
                    <p className="text-[9px] uppercase tracking-[0.4em] font-light">beauty-atelier.ru</p>
                </div>
            </div>

            <div className="mt-12 flex gap-6">
                <Link 
                    href={route('dashboard')}
                    className="uppercase tracking-[0.2em] text-[10px] font-bold text-deep-espresso/60 hover:text-deep-espresso transition"
                >
                    Вернуться в кабинет
                </Link>
            </div>
        </div>
    );
}
