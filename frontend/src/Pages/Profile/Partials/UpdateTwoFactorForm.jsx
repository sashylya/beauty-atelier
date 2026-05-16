import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

export default function UpdateTwoFactorForm({ className = '' }) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, processing, recentlySuccessful } = useForm({
        is_two_factor_enabled: user.is_two_factor_enabled,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update-2fa'), {
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Безопасность аккаунта</h2>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                    Двухфакторная аутентификация (2FA) добавляет дополнительный уровень защиты вашего аккаунта Beauty Atelier.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex items-center space-x-3 p-4 bg-[#FDFBF9] border border-[#E8D9D0] rounded-md">
                    <input
                        type="checkbox"
                        id="2fa_toggle"
                        checked={data.is_two_factor_enabled}
                        onChange={(e) => setData('is_two_factor_enabled', e.target.checked)}
                        className="w-5 h-5 rounded border-[#E8D9D0] text-[#4A3E3E] shadow-sm focus:ring-[#C4A484]"
                    />
                    <label htmlFor="2fa_toggle" className="text-sm font-serif italic text-[#4A3E3E] cursor-pointer">
                        Включить подтверждение входа через Email
                    </label>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center px-6 py-3 bg-[#4A3E3E] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#5D4E4E] transition ease-in-out duration-150"
                    >
                        Сохранить изменения
                    </button>

                    {recentlySuccessful && (
                        <p className="text-sm text-green-600 font-medium">Настройки обновлены.</p>
                    )}
                </div>
            </form>
        </section>
    );
}
