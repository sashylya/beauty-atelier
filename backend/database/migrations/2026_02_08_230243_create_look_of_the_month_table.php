<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('look_of_the_month', function (Blueprint $table) {
            $table->id();
            $table->string('title')->default('Образ месяца');
            $table->text('description')->nullable();
            $table->string('image_path')->nullable();
            $table->json('hotspots')->nullable(); // Массив объектов {x, y, product_id, label}
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('look_of_the_month');
    }
};