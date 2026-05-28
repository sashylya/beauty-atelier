import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <BeautyLayout>
            <Head title="Восстановление пароля | Beauty Atelier" />

            <div className="auth-page">
                <div className="auth-card">
                    <h2 className="auth-title">Сброс пароля</h2>

                    <div className="auth-description">
                        Забыли пароль? Нет проблем. Просто введите свой адрес электронной почты, 
                        и мы отправим вам ссылку для выбора нового.
                    </div>

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
                                autoFocus
                            />
                            {errors.email && <div className="auth-error">{errors.email}</div>}
                        </div>

                        <div className="auth-footer">
                            <button
                                type="submit"
                                className="auth-button auth-button-full"
                                disabled={processing}
                            >
                                Отправить ссылку
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BeautyLayout>
    );
}
