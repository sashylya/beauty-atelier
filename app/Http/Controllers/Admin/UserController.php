<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\LoginLog;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Показать список всех пользователей с аудитом безопасности.
     */
    public function index(): Response
    {
        // Получаем пользователей и считаем неудачные попытки входа за последние 24 часа
        $users = User::select('id', 'name', 'email', 'is_active', 'is_admin', 'last_login_at', 'blocked_at')
            ->withCount(['loginLogs as failed_attempts' => function ($query) {
                $query->where('is_successful', false)
                      ->where('created_at', '>=', now()->subDay());
            }])
            ->orderBy('id', 'desc')
            ->get();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Заблокировать или разблокировать пользователя.
     */
    public function toggleStatus(User $user): RedirectResponse
    {
        if (auth()->id() === $user->id) {
            return back()->with('error', 'Вы не можете заблокировать собственный аккаунт.');
        }

        $user->is_active = !$user->is_active;
        $user->blocked_at = $user->is_active ? null : now();
        $user->save();

        $status = $user->is_active ? 'разблокирован' : 'заблокирован';
        return back()->with('success', "Пользователь {$user->name} успешно {$status}.");
    }
}
