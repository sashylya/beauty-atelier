<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sku;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function index()
    {
        // Получаем избранное с привязанными SKU и продуктами
        $favorites = auth()->user()->favoriteProducts()
            ->with(['skus' => function($query) {
                // Загружаем только тот SKU, который в избранном
                $query->join('favorites', 'skus.id', '=', 'favorites.sku_id')
                      ->where('favorites.user_id', auth()->id())
                      ->select('skus.*');
            }])
            ->latest('favorites.created_at')
            ->get();
            
        // Более правильный подход для получения конкретных SKU в избранном
        $user = auth()->user();
        $favoriteSkus = Sku::whereHas('favoritedBy', function($q) use ($user) {
            $q->where('user_id', $user->id);
        })->with('product')->get();

        return Inertia::render('Wishlist/Index', [
            'favoriteSkus' => $favoriteSkus
        ]);
    }

    public function toggle(Request $request, Product $product)
    {
        $user = auth()->user();
        $skuId = $request->input('sku_id');
        
        $query = $user->favoriteProducts()
            ->where('product_id', $product->id)
            ->where('sku_id', $skuId);

        if ($query->exists()) {
            $user->favoriteProducts()->wherePivot('sku_id', $skuId)->detach($product->id);
            $status = 'removed';
        } else {
            $user->favoriteProducts()->attach($product->id, ['sku_id' => $skuId]);
            $status = 'added';
        }

        return redirect()->back()->with('success', $status === 'added' ? 'Товар добавлен в избранное' : 'Товар удален из избранного');
    }
}
