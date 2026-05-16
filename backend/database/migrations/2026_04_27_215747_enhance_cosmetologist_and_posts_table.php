<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('specialization')->nullable()->after('is_cosmetologist');
            $table->text('biography')->nullable()->after('specialization');
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->json('recommended_products')->nullable()->after('content');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['specialization', 'biography']);
        });

        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('recommended_products');
        });
    }
};
