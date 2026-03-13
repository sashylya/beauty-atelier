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

    // Добавляем проверку имени
    const isNameValid = /^[A-Za-zА-Яа-яЁё\s\-]+$/.test(data.name);
    // Проверка Email (минимум: наличие точки в домене)
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);

    // Функция для проверки сложности пароля на лету (клиентская валидация)
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

            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#FDFBF9]">
                <div className="w-full sm:max-w-md mt-6 px-8 py-10 bg-white shadow-sm overflow-hidden sm:rounded-lg border border-[#E8D9D0]">
                    <h2 className="text-3xl font-serif text-[#4A3E3E] text-center mb-8">Создание аккаунта</h2>

                    <form onSubmit={submit}>
                        <div>
                            <label className="block font-medium text-sm text-[#8C7A7A]">Ваше имя</label>
                            <input
                                type="text"
                                className="mt-1 block w-full border-[#E8D9D0] focus:border-[#C4A484] focus:ring-[#C4A484] rounded-md shadow-sm"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-[#8C7A7A]">Email</label>
                            <input
                                type="email"
                                className="mt-1 block w-full border-[#E8D9D0] focus:border-[#C4A484] focus:ring-[#C4A484] rounded-md shadow-sm"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
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
                            />
                            
                            {/* Индикатор сложности для диплома */}
                            <div className="mt-2 text-[10px] grid grid-cols-2 gap-1">
                                <span className={passCheck.length ? 'text-green-600' : 'text-gray-400'}>● 8+ символов</span>
                                <span className={passCheck.mixed ? 'text-green-600' : 'text-gray-400'}>● Регистр (Aa)</span>
                                <span className={passCheck.number ? 'text-green-600' : 'text-gray-400'}>● Цифры (123)</span>
                                <span className={passCheck.symbol ? 'text-green-600' : 'text-gray-400'}>● Спецсимволы (#!)</span>
                            </div>
                            
                            {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                        </div>

                        <div className="mt-4">
                            <label className="block font-medium text-sm text-[#8C7A7A]">Подтверждение пароля</label>
                            <input
                                type="password"
                                className="mt-1 block w-full border-[#E8D9D0] focus:border-[#C4A484] focus:ring-[#C4A484] rounded-md shadow-sm"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between mt-8">
                            <Link href={route('login')} className="text-sm text-[#8C7A7A] hover:text-[#C4A484] underline">
                                Уже есть аккаунт?
                            </Link>

                            <button
                                type="submit"
                                className="inline-flex items-center px-6 py-3 bg-[#4A3E3E] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#5D4E4E] active:bg-[#3D3333] transition ease-in-out duration-150"
                                disabled={processing}
                            >
                                Зарегистрироваться
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BeautyLayout>
    );
}
