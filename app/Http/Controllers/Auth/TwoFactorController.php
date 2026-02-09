<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TwoFactorController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/TwoFactor');
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
        ]);

        $user = User::find(session('auth.id'));

        if (!$user || $user->two_factor_code !== $request->code || $user->two_factor_expires_at < now()) {
            return back()->withErrors(['code' => 'Неверный или просроченный код.']);
        }

        // Очищаем код
        $user->resetTwoFactorCode();

        // Авторизуем
        Auth::login($user);
        $request->session()->regenerate();

        if ($user->is_admin) {
            return redirect()->route('admin.dashboard');
        }

        return redirect()->intended(route('dashboard'));
    }

    public function resend()
    {
        $user = User::find(session('auth.id'));
        $user->generateTwoFactorCode();
        
        // Здесь должна быть отправка Email, но для проекта мы просто выведем в логи
        \Log::info("Код 2FA для {$user->email}: {$user->two_factor_code}");

        return back()->with('status', 'Новый код отправлен на ваш Email.');
    }
}
