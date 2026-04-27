<?php

namespace App\Http\Requests\Auth;

use App\Models\LoginLog;
use App\Models\User;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $this->ensureIsNotRateLimited();

        $email = $this->string('email');
        $ip = $this->ip();
        $userAgent = $this->userAgent();

        // Попытка входа
        if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey());

            // Логируем неудачу
            LoginLog::create([
                'email' => $email,
                'ip_address' => $ip,
                'user_agent' => $userAgent,
                'is_successful' => false,
                'error_message' => 'Неверный пароль',
            ]);

            throw ValidationException::withMessages([
                'email' => 'Неверный адрес электронной почты или пароль.',
            ]);
        }

        // Дополнительная проверка на блокировку админом
        /** @var \App\Models\User $user */
        $user = Auth::user();
        if (!$user->is_active) {
            Auth::logout();
            
            // Логируем блокировку
            LoginLog::create([
                'email' => $email,
                'ip_address' => $ip,
                'user_agent' => $userAgent,
                'is_successful' => false,
                'error_message' => 'Аккаунт заблокирован',
            ]);

            throw ValidationException::withMessages([
                'email' => 'Ваш аккаунт заблокирован администратором.',
            ]);
        }

        // Логируем успех
        LoginLog::create([
            'email' => $email,
            'ip_address' => $ip,
            'user_agent' => $userAgent,
            'is_successful' => true,
        ]);

        // Обновляем дату последнего входа
        $user->update(['last_login_at' => now()]);

        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Ensure the login request is not rate limited.
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());
        $minutes = ceil($seconds / 60);

        // Логируем попытку подбора (Brute Force)
        LoginLog::create([
            'email' => $this->string('email'),
            'ip_address' => $this->ip(),
            'user_agent' => $this->userAgent(),
            'is_successful' => false,
            'error_message' => 'Блокировка по превышению лимита попыток',
        ]);

        throw ValidationException::withMessages([
            'email' => "Слишком много попыток входа. Пожалуйста, попробуйте через {$minutes} мин.",
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('email')).'|'.$this->ip());
    }
}
