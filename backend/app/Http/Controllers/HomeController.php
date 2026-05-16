<?php

namespace App\Http\Controllers;

use App\Models\LookOfTheMonth;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

class HomeController extends Controller
{
    public function index()
    {
        // 1. Загружаем Образ месяца
        $look = LookOfTheMonth::where('is_active', true)->first();
        if ($look && !empty($look->hotspots)) {
            $productIds = collect($look->hotspots)->pluck('product_id')->filter()->unique();
            $lookProducts = Product::whereIn('id', $productIds)->get()->keyBy('id');
            $look->hotspots = collect($look->hotspots)->map(function($h) use ($lookProducts) {
                if (isset($lookProducts[$h['product_id']])) {
                    $product = $lookProducts[$h['product_id']];
                    $h['label'] = $product->name;
                    $h['product_slug'] = $product->slug;
                }
                return $h;
            })->toArray();
        }

        // 2. Загружаем Хиты продаж
        // Логика вынесена в scope модели Product
        $hitProducts = Product::topSellers(10)
            ->with('skus')
            ->get();

        // 3. Загружаем последние статьи для блока "Дневник Ателье"
        $latestPosts = \App\Models\Post::where('is_active', true)
            ->latest('published_at')
            ->take(3)
            ->get();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'look' => $look,
            'hitProducts' => $hitProducts,
            'latestPosts' => $latestPosts,
        ]);
    }
}