<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Display the password reset link request view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/ForgotPassword', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming password reset link request.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status == Password::RESET_LINK_SENT) {
            return back()->with('status', 'Ссылка для сброса пароля отправлена на ваш Email.');
        }

        // Ручной перевод ошибок для диплома
        $errorMessage = 'Мы не можем найти пользователя с таким Email адресом.';
        if ($status == Password::RESET_THROTTLED) {
            $errorMessage = 'Пожалуйста, подождите перед повторной попыткой.';
        }

        throw ValidationException::withMessages([
            'email' => [$errorMessage],
        ]);
    }
}
