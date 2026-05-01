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
        
        $items = [];
        $subtotal = 0;
        $deliveryThreshold = 2000;
        $deliveryFee = 200;

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

        $isDeliveryFree = $subtotal >= $deliveryThreshold;
        $currentDeliveryFee = ($subtotal > 0 && !$isDeliveryFree) ? $deliveryFee : 0;
        
        $total = $subtotal > 0 ? $subtotal + $currentDeliveryFee : 0;

        return Inertia::render('Cart', [
            'items' => $items,
            'subtotal' => $subtotal,
            'total' => $total,
            'deliveryFee' => $currentDeliveryFee,
            'isDeliveryFree' => $isDeliveryFree,
            'deliveryThreshold' => $deliveryThreshold
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
        $currentQuantity = isset($cart[$sku->id]) ? $cart[$sku->id] : 0;
        
        if ($sku->stock < ($currentQuantity + 1)) {
            return redirect()->back()->with('error', 'К сожалению, больше нет в наличии.');
        }

        if (isset($cart[$sku->id])) { 
            $cart[$sku->id]++; 
        } else { 
            $cart[$sku->id] = 1; 
        }
        
        $request->session()->put('cart', $cart);
        return redirect()->back()->with('success', 'Товар добавлен в корзину');
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
        
        if ($sku->stock < $request->quantity) {
            return redirect()->back()->with('error', "В наличии только {$sku->stock} шт.");
        }

        $cart = $request->session()->get('cart', []);
        if (isset($cart[$sku->id])) {
            $cart[$sku->id] = $request->quantity;
            $request->session()->put('cart', $cart);
        }
        return redirect()->back();
    }
}
