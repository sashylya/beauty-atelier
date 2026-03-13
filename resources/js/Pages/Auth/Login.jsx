import React, { useEffect } from 'react';
import BeautyLayout from '@/Layouts/BeautyLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login() {
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

            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#FDFBF9]">
                <div className="w-full sm:max-w-md mt-6 px-8 py-10 bg-white shadow-sm overflow-hidden sm:rounded-lg border border-[#E8D9D0]">
                    <h2 className="text-3xl font-serif text-[#4A3E3E] text-center mb-8">Вход в личный кабинет</h2>

                    <form onSubmit={submit}>
                        <div>
                            <label className="block font-medium text-sm text-[#8C7A7A]">Email</label>
                            <input
                                type="email"
                                className="mt-1 block w-full border-[#E8D9D0] focus:border-[#C4A484] focus:ring-[#C4A484] rounded-md shadow-sm"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />
                            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-[#8C7A7A]">Пароль</label>
                            <input
                                type="password"
                                className="mt-1 block w-full border-[#E8D9D0] focus:border-[#C4A484] focus:ring-[#C4A484] rounded-md shadow-sm"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                            {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                        </div>

                        <div className="block mt-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-[#E8D9D0] text-[#4A3E3E] shadow-sm focus:ring-[#C4A484]"
                                />
                                <span className="ms-2 text-sm text-[#8C7A7A]">Запомнить меня</span>
                            </label>
                        </div>

                        <div className="flex items-center justify-between mt-8">
                            <Link href={route('register')} className="text-sm text-[#8C7A7A] hover:text-[#C4A484] underline">
                                Создать аккаунт
                            </Link>

                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-3 bg-[#4A3E3E] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#5D4E4E] active:bg-[#3D3333] transition ease-in-out duration-150"
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
