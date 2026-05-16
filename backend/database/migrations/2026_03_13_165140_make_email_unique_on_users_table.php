<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // The base users migration already creates a unique index on email.
        // Keep only the deduplication step for legacy data.
        DB::statement('DELETE FROM users WHERE id NOT IN (SELECT MIN(id) FROM users GROUP BY email)');
    }

    public function down(): void
    {
        // No-op: the unique index belongs to the base users migration.
    }
};
