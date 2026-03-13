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

            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#FDFBF9]">
                <div className="w-full sm:max-w-md mt-6 px-8 py-10 bg-white shadow-sm overflow-hidden sm:rounded-lg border border-[#E8D9D0]">
                    <h2 className="text-3xl font-serif text-[#4A3E3E] text-center mb-6">Двухфакторная проверка</h2>

                    <div className="mb-8 text-sm text-[#8C7A7A] leading-relaxed text-center">
                        На ваш Email был отправлен 6-значный код подтверждения. 
                        Пожалуйста, введите его ниже для входа в личный кабинет.
                    </div>

                    <form onSubmit={submit}>
                        <div>
                            <label className="block font-medium text-sm text-[#8C7A7A] text-center mb-4">Код из письма</label>
                            <input
                                type="text"
                                className="block w-full text-center text-2xl tracking-[1em] border-[#E8D9D0] focus:border-[#C4A484] focus:ring-[#C4A484] rounded-md shadow-sm"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                required
                                autoFocus
                                maxLength="6"
                                placeholder="000000"
                            />
                            {errors.code && <div className="text-red-500 text-xs mt-2 text-center">{errors.code}</div>}
                        </div>

                        <div className="flex flex-col items-center mt-8">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center items-center px-6 py-3 bg-[#4A3E3E] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#5D4E4E] transition ease-in-out duration-150"
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
