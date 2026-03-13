<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Сначала удалим дубликаты, если они есть, чтобы миграция прошла успешно
        // (Оставим только одну запись для каждого email)
        DB::statement('DELETE FROM users WHERE id NOT IN (SELECT MIN(id) FROM users GROUP BY email)');

        Schema::table('users', function (Blueprint $table) {
            // Добавляем уникальный индекс (если его еще нет)
            $table->unique('email');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique(['email']);
        });
    }
};
