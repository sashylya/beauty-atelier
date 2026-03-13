<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class AuthenticatedSessionController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function store(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ], [
            'email.required' => 'Введите ваш Email.',
            'password.required' => 'Введите пароль.',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return back()->withErrors(['email' => 'Неверный email или пароль.'])->onlyInput('email');
        }

        // Если 2FA включена
        if ($user->is_two_factor_enabled) {
            $code = rand(100000, 999999);
            
            $user->update([
                'two_factor_code' => $code,
                'two_factor_expires_at' => Carbon::now()->addMinutes(10),
            ]);

            // ПРИНУДИТЕЛЬНАЯ ОТПРАВКА С ГАРАНТИЕЙ SMTP
            try {
                Mail::raw("Ваш код подтверждения для входа в Beauty Atelier: {$code}. Код действителен 10 минут.", function ($message) use ($user) {
                    $message->to($user->email)->subject('Код подтверждения (2FA)');
                });
            } catch (\Exception $e) {
                \Log::error("ОШИБКА ОТПРАВКИ 2FA: " . $e->getMessage());
                return back()->withErrors(['email' => 'Ошибка отправки кода на почту. Попробуйте позже.']);
            }

            $request->session()->put('2fa_user_id', $user->id);
            return redirect()->route('2fa.index');
        }

        Auth::login($user, $request->boolean('remember'));
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
}
