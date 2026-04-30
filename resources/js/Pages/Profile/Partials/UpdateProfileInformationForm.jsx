import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            specialization: user.specialization || '',
            biography: user.biography || '',
            avatar: null,
            _method: 'PATCH'
        });

    const submit = (e) => {
        e.preventDefault();

        post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Информация профиля
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Обновите информацию вашего профиля и адрес электронной почты.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-2 border-champagne-gold/20">
                        {user.avatar ? (
                            <img src={`/storage/${user.avatar}`} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-2 font-bold uppercase tracking-tighter">Нет фото</div>
                        )}
                    </div>
                    <div className="flex-1">
                        <InputLabel htmlFor="avatar" value="Фотография профиля" />
                        <input 
                            id="avatar"
                            type="file"
                            onChange={(e) => setData('avatar', e.target.files[0])}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-bold file:bg-creamy-silk file:text-deep-espresso hover:file:bg-champagne-gold/20"
                        />
                        <InputError className="mt-2" message={errors.avatar} />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Имя" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {user.is_cosmetologist && (
                    <>
                        <div>
                            <InputLabel htmlFor="specialization" value="Специализация (будет видна в блоге)" />
                            <TextInput
                                id="specialization"
                                className="mt-1 block w-full"
                                value={data.specialization}
                                onChange={(e) => setData('specialization', e.target.value)}
                                placeholder="Например: Ведущий косметолог"
                            />
                            <InputError className="mt-2" message={errors.specialization} />
                        </div>

                        <div>
                            <InputLabel htmlFor="biography" value="О себе (краткая цитата)" />
                            <textarea
                                id="biography"
                                className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                value={data.biography}
                                onChange={(e) => setData('biography', e.target.value)}
                                rows="3"
                                placeholder="Напишите краткую биографию для карточки в блоге..."
                            />
                            <InputError className="mt-2" message={errors.biography} />
                        </div>
                    </>
                )}

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Ваш адрес электронной почты не подтвержден.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Нажмите здесь, чтобы повторно отправить письмо для подтверждения.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                На ваш адрес электронной почты была отправлена новая ссылка для подтверждения.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Сохранить</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Сохранено.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
