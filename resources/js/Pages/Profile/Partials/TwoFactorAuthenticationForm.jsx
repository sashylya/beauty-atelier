import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

export default function TwoFactorAuthenticationForm({ className = '' }) {
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
                <p className="mt-1 text-sm text-deep-espresso/60 leading-relaxed mb-6">
                    Двухфакторная аутентификация добавляет дополнительный уровень безопасности вашей учетной записи, требуя 
                    код подтверждения при входе.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex items-center gap-4">
                    <label className="flex items-center cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={data.is_two_factor_enabled}
                            onChange={(e) => {
                                setData('is_two_factor_enabled', e.target.checked);
                                // Мы можем отправить форму сразу при клике для удобства
                                patch(route('profile.update-2fa'), {
                                    data: { is_two_factor_enabled: e.target.checked },
                                    preserveScroll: true,
                                });
                            }}
                            className="form-checkbox h-5 w-5 text-champagne-gold border-deep-espresso/10 focus:ring-0 rounded-none"
                        />
                        <span className="ml-3 text-sm font-medium text-deep-espresso uppercase tracking-widest">
                            {data.is_two_factor_enabled ? 'Включена' : 'Выключена'}
                        </span>
                    </label>
                </div>

                {recentlySuccessful && (
                    <p className="text-sm text-champagne-gold animate-fade-in font-medium">Настройки безопасности обновлены.</p>
                )}
            </form>
        </section>
    );
}
