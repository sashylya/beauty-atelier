import React, { useEffect } from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'));
    };

    return (
        <BeautyLayout>
            <Head title="Новый пароль | Beauty Atelier" />

            <div className="auth-page">
                <div className="auth-card">
                    <h2 className="auth-title">Создание нового пароля</h2>

                    <form onSubmit={submit}>
                        <div className="auth-form-group">
                            <label className="auth-label">Email</label>
                            <input
                                type="email"
                                className="auth-input"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />
                            {errors.email && <div className="auth-error">{errors.email}</div>}
                        </div>

                        <div className="auth-form-group mt-4">
                            <label className="auth-label">Новый пароль</label>
                            <input
                                type="password"
                                className="auth-input"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                autoComplete="new-password"
                                autoFocus
                            />
                            {errors.password && <div className="auth-error">{errors.password}</div>}
                        </div>

                        <div className="auth-form-group mt-4">
                            <label className="auth-label">Подтверждение пароля</label>
                            <input
                                type="password"
                                className="auth-input"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                                autoComplete="new-password"
                            />
                            {errors.password_confirmation && <div className="auth-error">{errors.password_confirmation}</div>}
                        </div>

                        <div className="flex items-center justify-center mt-8">
                            <button
                                type="submit"
                                className="auth-button auth-button-full"
                                disabled={processing}
                            >
                                Сбросить пароль
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BeautyLayout>
    );
}
