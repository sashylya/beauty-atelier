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
        $favoriteSkus = auth()->user()->favoriteSkus()
            ->with('product')
            ->latest('favorites.created_at')
            ->get();

        return Inertia::render('Wishlist/Index', [
            'favoriteSkus' => $favoriteSkus
        ]);
    }

    public function toggle(Request $request, Product $product)
    {
        $user = auth()->user();
        $skuId = $request->input('sku_id');
        
        $isFavorited = $user->favoriteSkus()->where('sku_id', $skuId)->exists();

        if ($isFavorited) {
            $user->favoriteSkus()->detach($skuId);
            $status = 'removed';
        } else {
            $user->favoriteSkus()->attach($skuId, ['product_id' => $product->id]);
            $status = 'added';
        }

        return redirect()->back()->with('success', $status === 'added' ? 'Товар добавлен в избранное' : 'Товар удален из избранного');
    }
}
