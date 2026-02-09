import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link } from '@inertiajs/react';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import TwoFactorAuthenticationForm from './Partials/TwoFactorAuthenticationForm';
import DeleteUserForm from './Partials/DeleteUserForm';

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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-12">
                        {/* Profile Info */}
                        <div className="bg-white p-8 sm:p-12 shadow-sm border border-deep-espresso/5">
                            <h2 className="font-serif italic text-2xl text-deep-espresso mb-8">Личные Данные</h2>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                         {/* 2FA */}
                         <div className="bg-white p-8 sm:p-12 shadow-sm border border-deep-espresso/5">
                            <h2 className="font-serif italic text-2xl text-deep-espresso mb-8">Двухфакторная аутентификация</h2>
                            <TwoFactorAuthenticationForm className="max-w-xl" />
                        </div>
                    </div>

                    <div className="space-y-12">
                        {/* Password */}
                        <div className="bg-white p-8 sm:p-12 shadow-sm border border-deep-espresso/5">
                            <h2 className="font-serif italic text-2xl text-deep-espresso mb-8">Безопасность</h2>
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                         {/* Danger Zone */}
                         <div className="bg-creamy-silk/50 p-8 sm:p-12 border border-red-100">
                            <h2 className="font-serif italic text-2xl text-red-900 mb-4">Удаление Аккаунта</h2>
                            <p className="text-sm text-deep-espresso/60 mb-8 leading-relaxed">
                                После удаления вашей учетной записи все ее ресурсы и данные будут удалены безвозвратно. 
                                Пожалуйста, загрузите все данные или информацию, которую вы хотите сохранить, перед этим действием.
                            </p>
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </BeautyLayout>
    );
}