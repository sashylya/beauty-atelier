<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('skus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->string('shade_name');
            $table->string('color_hex')->nullable(); // For UI circles
            $table->decimal('price', 10, 2);
            $table->integer('stock')->default(0);
            $table->string('image_url')->nullable();
            $table->string('video_url')->nullable(); // For texture swatches
            
            // Filterable attributes
            $table->string('coverage')->nullable(); // Вуальное, легкое, среднее, полное
            $table->string('finish')->nullable(); 
            $table->string('dress_code')->nullable(); // Business Casual, Cocktail Party...
            $table->string('durability')->nullable(); // Стойкость
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('skus');
    }
};