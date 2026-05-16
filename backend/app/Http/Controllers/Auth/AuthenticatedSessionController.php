<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\LoginLog;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    //открывется стр
    public function create(): Response
    {
        return Inertia::render('Auth/Login');
    }

    //валидация
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ], [
            'email.required' => 'Введите ваш Email.',
            'password.required' => 'Введите пароль.',
        ]);

        $email = Str::lower((string) $request->input('email'));
        $throttleKey = $this->throttleKey($request);//лимит попыток входа
        $user = User::where('email', $email)->first();
        $ip = $request->ip();
        $userAgent = $request->userAgent();//входы в логи и подозрительных попыток

        //проверка от атаки бдютфорс
        if ($user && ! $user->is_active) {
            if ($user->blocked_at && $user->blocked_at->lte(now()->subDay())) {
                $user->update([
                    'is_active' => true,
                    'blocked_at' => null,
                ]);
            } else {
                return back()->withErrors([
                    'email' => 'Ваш аккаунт заблокирован. Повторите попытку через 24 часа или обратитесь к администратору.',
                ])->onlyInput('email');
            }
        }

        //считается количесто попыток входов 
        if (! $user || ! Hash::check($request->password, $user->password)) {
            RateLimiter::hit($throttleKey);
            $attempts = RateLimiter::attempts($throttleKey);

            LoginLog::create([
                'email' => $email,
                'ip_address' => $ip,
                'user_agent' => $userAgent,
                'is_successful' => false,
                'error_message' => 'Invalid credentials',
            ]);

            if ($user && $user->is_active && $attempts >= 5) {
                $user->update([
                    'is_active' => false,
                    'blocked_at' => now(),
                ]);

                LoginLog::create([
                    'email' => $email,
                    'ip_address' => $ip,
                    'user_agent' => $userAgent,
                    'is_successful' => false,
                    'error_message' => 'Account blocked after 5 failed attempts',
                ]);

                return back()->withErrors([
                    'email' => 'Аккаунт заблокирован после 5 неудачных попыток входа.',
                ])->onlyInput('email');
            }

            return back()->withErrors([
                'email' => 'Неверный email или пароль.',
            ])->onlyInput('email');
        }

        //при удачном входе обнул
        RateLimiter::clear($throttleKey);

        //2fa
        if ($user->is_two_factor_enabled) {
            $code = (string) random_int(100000, 999999);

            $user->update([
                'two_factor_code' => $code,
                'two_factor_expires_at' => Carbon::now()->addMinutes(10),
            ]);

            $request->session()->put('2fa_user_id', $user->id);

            try {
                Mail::raw(
                    "Ваш код подтверждения для входа в Beauty Atelier: {$code}. Код действует 10 минут.",
                    function ($message) use ($user) {
                        $message->to($user->email)->subject('Код подтверждения (2FA)');
                    }
                );

                return redirect()
                    ->route('2fa.index')
                    ->with('success', 'Код подтверждения отправлен на Email.');
            } catch (\Throwable $e) {
                Log::error('2FA mail send failed: '.$e->getMessage(), [
                    'email' => $user->email,
                ]);

                if (app()->environment('local')) {
                    return redirect()
                        ->route('2fa.index')
                        ->with('info', 'Не удалось отправить письмо. Используйте код ниже.')
                        ->with('two_factor_code', $code);
                }

                return back()->withErrors([
                    'email' => 'Ошибка отправки кода на почту. Попробуйте позже.',
                ]);
            }
        }

        Auth::login($user, $request->boolean('remember'));
        $user->update(['last_login_at' => now()]);

        LoginLog::create([
            'email' => $email,
            'ip_address' => $ip,
            'user_agent' => $userAgent,
            'is_successful' => true,
        ]);

        $request->session()->regenerate();

        return redirect()->intended(route('home'));
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }

    private function throttleKey(Request $request): string
    {
        return Str::transliterate(Str::lower((string) $request->input('email')).'|'.$request->ip());
    }
}
