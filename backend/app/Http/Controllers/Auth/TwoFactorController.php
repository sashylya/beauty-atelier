<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class TwoFactorController extends Controller
{
    public function index(Request $request): Response|RedirectResponse
    {
        // Если в сессии нет ID пользователя, отправляем на логин
        if (!$request->session()->has('2fa_user_id')) {
            return redirect()->route('login');
        }

        return Inertia::render('Auth/TwoFactor');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'code' => 'required|numeric',
        ], [
            'code.required' => 'Введите код подтверждения.',
            'code.numeric' => 'Код должен состоять только из цифр.',
        ]);

        if (!$request->session()->has('2fa_user_id')) {
            return redirect()->route('login');
        }

        $user = User::find($request->session()->get('2fa_user_id'));

        // Проверяем код и время его жизни
        if ($user->two_factor_code == $request->code && Carbon::now()->lt($user->two_factor_expires_at)) {
            // Очищаем код в базе
            $user->update([
                'two_factor_code' => null,
                'two_factor_expires_at' => null,
            ]);

            // Удаляем временный ID из сессии и логиним пользователя
            $request->session()->forget('2fa_user_id');
            Auth::login($user);
            $request->session()->regenerate();

            return redirect()->intended(route('home'));
        }

        return back()->withErrors(['code' => 'Неверный код или срок его действия истек.']);
    }
}
