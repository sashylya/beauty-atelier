import React, { useEffect } from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
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
        post(route('register'));
    };

    // Функция для проверки сложности пароля на лету
    const validatePassword = (pass) => {
        return {
            length: pass.length >= 8,
            mixed: /[a-z]/.test(pass) && /[A-Z]/.test(pass),
            number: /[0-9]/.test(pass),
            symbol: /[^A-Za-z0-9]/.test(pass),
        };
    };

    const passCheck = validatePassword(data.password);

    return (
        <BeautyLayout>
            <Head title="Регистрация | Beauty Atelier" />

            <div className="auth-page">
                <div className="auth-card">
                    <h2 className="auth-title">Создание аккаунта</h2>

                    <form onSubmit={submit}>
                        <div className="auth-form-group">
                            <label className="auth-label">Ваше имя</label>
                            <input
                                type="text"
                                className="auth-input"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <div className="auth-error">{errors.name}</div>}
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-label">Email</label>
                            <input
                                type="email"
                                className="auth-input"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
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
                            />
                            
                            <div className="pass-check-grid">
                                <span className={`pass-check-item ${passCheck.length ? 'valid' : ''}`}>● 8+ символов</span>
                                <span className={`pass-check-item ${passCheck.mixed ? 'valid' : ''}`}>● Регистр (Aa)</span>
                                <span className={`pass-check-item ${passCheck.number ? 'valid' : ''}`}>● Цифры (123)</span>
                                <span className={`pass-check-item ${passCheck.symbol ? 'valid' : ''}`}>● Спецсимволы (#!)</span>
                            </div>
                            
                            {errors.password && <div className="auth-error">{errors.password}</div>}
                        </div>

                        <div className="auth-form-group">
                            <label className="auth-label">Подтверждение пароля</label>
                            <input
                                type="password"
                                className="auth-input"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                        </div>

                        <div className="auth-footer">
                            <Link href={route('login')} className="auth-link">
                                Уже есть аккаунт?
                            </Link>

                            <button
                                type="submit"
                                className="auth-button"
                                disabled={processing}
                            >
                                Регистрация
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BeautyLayout>
    );
}
