import React from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function TwoFactor({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('two-factor.store'));
    };

    return (
        <BeautyLayout>
            <Head title="Двухфакторная аутентификация" />

            <div className="max-w-md mx-auto py-20 px-6">
                <div className="bg-white p-10 shadow-2xl border border-deep-espresso/5 text-center">
                    <h1 className="font-serif italic text-4xl text-deep-espresso mb-6">Проверка доступа</h1>
                    <p className="text-xs uppercase tracking-widest text-deep-espresso/50 mb-10 leading-relaxed">
                        Мы отправили 6-значный код на ваш Email. <br/> Пожалуйста, введите его ниже для входа.
                    </p>

                    {status && <div className="mb-6 text-sm text-champagne-gold font-medium">{status}</div>}

                    <form onSubmit={submit} className="space-y-8">
                        <div>
                            <input
                                type="text"
                                name="code"
                                value={data.code}
                                className="w-full text-center text-3xl font-serif tracking-[0.5em] border-b border-deep-espresso/20 focus:border-champagne-gold transition-colors py-4 bg-transparent outline-none"
                                onChange={(e) => setData('code', e.target.value)}
                                placeholder="000000"
                                required
                                autoFocus
                            />
                            {errors.code && <p className="mt-2 text-[10px] text-red-500 uppercase tracking-widest">{errors.code}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-deep-espresso text-creamy-silk uppercase tracking-[0.4em] text-[11px] font-bold py-6 hover:bg-champagne-gold transition-all duration-500 shadow-xl"
                        >
                            {processing ? 'Проверка...' : 'Войти'}
                        </button>
                    </form>

                    <div className="mt-12 pt-8 border-t border-deep-espresso/5">
                        <form onSubmit={(e) => { e.preventDefault(); post(route('two-factor.resend')); }}>
                            <button
                                type="submit"
                                className="text-[9px] uppercase tracking-widest font-bold text-deep-espresso/40 hover:text-champagne-gold transition-colors"
                            >
                                Не получили код? Отправить снова
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </BeautyLayout>
    );
}
