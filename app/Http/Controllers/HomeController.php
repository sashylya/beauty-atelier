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

        // 2. Загружаем Хиты продаж (до 10 шт для слайдера)
        $hitProducts = Product::where('is_hit', true)
            ->with('skus')
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'look' => $look,
            'hitProducts' => $hitProducts,
        ]);
    }
}