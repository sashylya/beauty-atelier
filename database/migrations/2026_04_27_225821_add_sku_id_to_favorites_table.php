<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('favorites', function (Blueprint $table) {
            $table->foreignId('sku_id')->nullable()->after('product_id')->constrained()->onDelete('cascade');
            
            // Удаляем старый уникальный индекс и создаем новый, включающий SKU
            $table->dropUnique(['user_id', 'product_id']);
            $table->unique(['user_id', 'product_id', 'sku_id']);
        });
    }

    public function down(): void
    {
        Schema::table('favorites', function (Blueprint $table) {
            $table->dropUnique(['user_id', 'product_id', 'sku_id']);
            $table->dropForeign(['sku_id']);
            $table->dropColumn('sku_id');
            $table->unique(['user_id', 'product_id']);
        });
    }
};
