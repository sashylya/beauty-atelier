import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link } from '@inertiajs/react';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateTwoFactorForm from './Partials/UpdateTwoFactorForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <BeautyLayout>
            <Head title="Настройки Профиля" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="mb-12">
                    <Link href={route('dashboard')} className="uppercase tracking-[0.4em] text-[9px] font-bold text-deep-espresso/40 hover:text-champagne-gold transition mb-8 inline-block">
                        ← Назад в кабинет
                    </Link>
                    <h1 className="font-serif italic text-5xl text-deep-espresso mb-4">Настройки Профиля</h1>
                    <p className="text-deep-espresso/60 font-light italic">Управление личными данными и безопасностью.</p>
                </div>

                <div className="max-w-3xl space-y-12">
                    {/* Profile Info */}
                    <div className="bg-white p-8 sm:p-12 shadow-sm border border-deep-espresso/5">
                        <h2 className="font-serif italic text-2xl text-deep-espresso mb-8 border-b border-[#F5F1EE] pb-4">Личные Данные</h2>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* 2FA Security Section */}
                    <div className="bg-white p-8 sm:p-12 shadow-sm border border-deep-espresso/5">
                        <h2 className="font-serif italic text-2xl text-deep-espresso mb-8 border-b border-[#F5F1EE] pb-4">Безопасность (2FA)</h2>
                        <UpdateTwoFactorForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </BeautyLayout>
    );
}
