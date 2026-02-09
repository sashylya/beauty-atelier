<?php

namespace App\Http\Controllers;

use App\Models\Sku;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $cart = $request->session()->get('cart', []);
        $wantsPackaging = $request->session()->get('wants_packaging', true);
        
        $items = [];
        $subtotal = 0;
        $packagingPrice = 300; 
        $freePackagingThreshold = 2000;

        foreach ($cart as $skuId => $quantity) {
            $sku = Sku::with('product')->find($skuId);
            if ($sku) {
                $items[] = [
                    'sku' => $sku,
                    'quantity' => $quantity,
                ];
                $subtotal += $sku->price * $quantity;
            }
        }

        $isPackagingFree = $subtotal >= $freePackagingThreshold;
        
        // Если упаковка не бесплатная и пользователь от нее отказался
        $actualPackagingPrice = ($isPackagingFree || $wantsPackaging) ? ($isPackagingFree ? 0 : $packagingPrice) : 0;
        
        $total = $subtotal > 0 ? $subtotal + $actualPackagingPrice : 0;

        return Inertia::render('Cart', [
            'items' => $items,
            'subtotal' => $subtotal,
            'total' => $total,
            'packagingPrice' => $actualPackagingPrice,
            'isPackagingFree' => $isPackagingFree,
            'wantsPackaging' => $wantsPackaging,
            'freePackagingThreshold' => $freePackagingThreshold
        ]);
    }

    public function togglePackaging(Request $request)
    {
        $current = $request->session()->get('wants_packaging', true);
        $request->session()->put('wants_packaging', !$current);
        return redirect()->back();
    }

    public function add(Request $request, Sku $sku)
    {
        $cart = $request->session()->get('cart', []);
        if (isset($cart[$sku->id])) { $cart[$sku->id]++; } else { $cart[$sku->id] = 1; }
        $request->session()->put('cart', $cart);
        return redirect()->back();
    }

    public function remove(Request $request, Sku $sku)
    {
        $cart = $request->session()->get('cart', []);
        if (isset($cart[$sku->id])) { unset($cart[$sku->id]); }
        $request->session()->put('cart', $cart);
        return redirect()->back();
    }

    public function updateQuantity(Request $request, Sku $sku)
    {
        $request->validate(['quantity' => 'required|integer|min:1|max:99']);
        $cart = $request->session()->get('cart', []);
        if (isset($cart[$sku->id])) {
            $cart[$sku->id] = $request->quantity;
            $request->session()->put('cart', $cart);
        }
        return redirect()->back();
    }
}
