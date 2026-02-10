import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Вход в кабинет" />

            <div className="mb-10 text-center">
                <h2 className="font-serif text-3xl italic text-[#5D2E18] mb-2">С возвращением</h2>
            </div>

            {status && (
                <div className="mb-6 text-sm font-medium text-[#5D2E18] bg-[#E6D5C8]/30 p-3 border border-[#E6D5C8]">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Email" className="uppercase tracking-widest text-[9px] text-gray-500 mb-2" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="block w-full border-0 border-b border-[#D4AF37] bg-transparent focus:border-[#5D2E18] focus:ring-0 px-0 py-2 text-[#5D2E18] placeholder-gray-300 transition-colors"
                        autoComplete="username"
                        isFocused={true}
                        placeholder="example@mail.ru"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2 text-[10px] tracking-wider text-red-600" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Пароль" className="uppercase tracking-widest text-[9px] text-gray-500 mb-2" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="block w-full border-0 border-b border-[#D4AF37] bg-transparent focus:border-[#5D2E18] focus:ring-0 px-0 py-2 text-[#5D2E18] placeholder-gray-300 transition-colors"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2 text-[10px] tracking-wider text-red-600" />
                </div>

                <div className="mt-10">
                    <button 
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#5D2E18] text-white uppercase tracking-[0.2em] text-[10px] font-bold py-4 hover:bg-[#4A2512] transition-colors disabled:opacity-50"
                    >
                        Войти
                    </button>
                </div>
                
                <div className="mt-6 text-center">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Нет аккаунта? </span>
                    <Link href={route('register')} className="text-[10px] uppercase tracking-wider text-[#5D2E18] font-bold hover:text-[#D4AF37] border-b border-[#5D2E18] hover:border-[#D4AF37] transition-all ml-2">
                        Зарегистрироваться
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}