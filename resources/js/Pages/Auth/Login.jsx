import React, { useEffect } from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <BeautyLayout>
            <Head title="Вход | Beauty Atelier" />

            <div className="auth-page">
                <div className="auth-card">
                    <h2 className="auth-title">Вход в личный кабинет</h2>

                    {status && (
                        <div className="auth-status">
                            {status}
                        </div>
                    )}

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
                                pattern="[a-z0-9._%+-]+@gmail\.com$"
                                title="Пожалуйста, используйте почту @gmail.com"
                            />
                            {errors.email && <div className="auth-error">{errors.email}</div>}
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-label">Пароль</label>
                            <input
                                type="password"
                                className="auth-input"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                            {errors.password && <div className="auth-error">{errors.password}</div>}
                        </div>

                        <div className="auth-form-group">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="auth-checkbox"
                                />
                                <span className="ms-2 text-sm text-[#8C7A7A]">Запомнить меня</span>
                            </label>
                        </div>

                        <div className="auth-footer">
                            <div className="flex flex-col gap-2">
                                <Link href={route('register')} className="auth-link">
                                    Создать аккаунт
                                </Link>
                                <Link href={route('password.request')} className="auth-link">
                                    Забыли пароль?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="auth-button"
                                disabled={processing}
                            >
                                Войти
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BeautyLayout>
    );
}
