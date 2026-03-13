import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, useForm } from '@inertiajs/react';

export default function TwoFactor() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('2fa.store'));
    };

    return (
        <BeautyLayout>
            <Head title="Подтверждение входа | Beauty Atelier" />

            <div className="auth-page">
                <div className="auth-card">
                    <h2 className="auth-title">Двухфакторная проверка</h2>

                    <div className="auth-description text-center">
                        На ваш Email был отправлен 6-значный код подтверждения. 
                        Пожалуйста, введите его ниже для входа в личный кабинет.
                    </div>

                    <form onSubmit={submit}>
                        <div className="auth-form-group">
                            <label className="auth-label text-center mb-4">Код из письма</label>
                            <input
                                type="text"
                                className="auth-input auth-input-center"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                required
                                autoFocus
                                maxLength="6"
                                placeholder="000000"
                            />
                            {errors.code && <div className="auth-error text-center mt-2">{errors.code}</div>}
                        </div>

                        <div className="flex flex-col items-center mt-8">
                            <button
                                type="submit"
                                className="auth-button auth-button-full"
                                disabled={processing}
                            >
                                Подтвердить вход
                            </button>
                            
                            <p className="mt-4 text-xs text-[#8C7A7A]">
                                Код действителен в течение 10 минут.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </BeautyLayout>
    );
}
