<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sku;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    public function index()
    {
        $favorites = DB::table('favorites')
            ->where('user_id', Auth::id())
            ->latest('created_at')
            ->get();

        $favoriteSkus = $favorites->map(function ($fav) {
            $product = Product::find($fav->product_id);
            if (!$product) return null;

            $sku = null;
            if ($fav->sku_id) {
                $sku = Sku::find($fav->sku_id);
            }

            if (!$sku) {
                $sku = $product->skus()->first() ?: (object)[
                    'id' => null,
                    'product_id' => $product->id,
                    'shade_name' => 'Стандартный',
                    'color_hex' => '#F9F9F9',
                    'price' => $product->price,
                    'image_url' => $product->image_path,
                ];
            }

            $sku->product = $product;
            return $sku;
        })->filter();

        return Inertia::render('Wishlist/Index', [
            'favoriteSkus' => $favoriteSkus
        ]);
    }

    public function toggle(Request $request, $id)
    {
        $userId = Auth::id();
        if (!$userId) return back();

        $skuId = $request->input('sku_id');
        if (!$skuId || $skuId === "null" || $skuId === 0 || $skuId === "0") $skuId = null;

        $query = DB::table('favorites')
            ->where('user_id', $userId)
            ->where('product_id', $id);

        if (is_null($skuId)) {
            $query->whereNull('sku_id');
        } else {
            $query->where('sku_id', $skuId);
        }

        $existing = $query->first();

        if ($existing) {
            DB::table('favorites')->where('id', $existing->id)->delete();
        } else {
            DB::table('favorites')->insert([
                'user_id' => $userId,
                'product_id' => $id,
                'sku_id' => $skuId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return back();
    }
}
