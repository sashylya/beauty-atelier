<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('status')->default('pending')->change(); // Изменим статус по умолчанию на ожидание оплаты
            $table->string('payment_id')->nullable()->after('status');
            $table->string('payment_url', 500)->nullable()->after('payment_id');
            $table->timestamp('paid_at')->nullable()->after('payment_url');
            $table->decimal('total_price', 10, 2)->default(0)->after('tickets_count');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('status')->default('confirmed')->change();
            $table->dropColumn(['payment_id', 'payment_url', 'paid_at', 'total_price']);
        });
    }
};
