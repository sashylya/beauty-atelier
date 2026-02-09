<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('skus');

        // Фильтр по категориям
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        // Поиск
        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Фильтр по цене (минимальная и максимальная)
        if ($request->filled('min_price')) {
            $query->where(function($q) use ($request) {
                $q->where('price', '>=', $request->min_price)
                  ->orWhereHas('skus', function($sq) use ($request) {
                      $sq->where('price', '>=', $request->min_price);
                  });
            });
        }
        if ($request->filled('max_price')) {
            $query->where(function($q) use ($request) {
                $q->where('price', '<=', $request->max_price)
                  ->orWhereHas('skus', function($sq) use ($request) {
                      $sq->where('price', '<=', $request->max_price);
                  });
            });
        }

        // Фильтры по характеристикам (через SKU)
        foreach (['coverage', 'finish', 'dress_code'] as $attr) {
            if ($request->filled($attr)) {
                $query->whereHas('skus', function ($q) use ($request, $attr) {
                    $q->where($attr, $request->$attr);
                });
            }
        }

        // Сортировка
        switch ($request->sort) {
            case 'price_asc':
                $query->orderBy('price', 'asc');
                break;
            case 'price_desc':
                $query->orderBy('price', 'desc');
                break;
            case 'name_asc':
                $query->orderBy('name', 'asc');
                break;
            default:
                $query->latest();
                break;
        }

        $products = $query->get();

        return Inertia::render('Catalog', [
            'products' => $products,
            'filters' => $request->all(['category', 'search', 'sort', 'min_price', 'max_price', 'coverage', 'finish']),
        ]);
    }

    public function show($slug)
    {
        $product = Product::with('skus')->where('slug', $slug)->firstOrFail();

        return Inertia::render('Product/Show', [
            'product' => $product,
        ]);
    }
}
