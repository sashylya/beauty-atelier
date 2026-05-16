<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string|min:5|max:1000',
            'sku_id' => 'nullable|exists:skus,id',
        ]);

        Review::create([
            'user_id' => Auth::id(),
            'product_id' => $product->id,
            'sku_id' => $request->sku_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'is_approved' => false, // Requires moderation
        ]);

        return back()->with('success', 'Отзыв отправлен на модерацию. Спасибо!');
    }
}
