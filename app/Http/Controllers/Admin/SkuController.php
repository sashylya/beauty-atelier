<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Sku;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SkuController extends Controller
{
    /**
     * Display a listing of the resource for a specific product.
     */
    public function index(Product $product)
    {
        $product->load('skus');
        return Inertia::render('Admin/Skus/Index', [
            'product' => $product,
            'skus' => $product->skus
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Product $product)
    {
        return Inertia::render('Admin/Skus/Create', [
            'product' => $product
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Product $product)
    {
        $validated = $request->validate([
            'shade_name' => 'required|string|max:255',
            'color_hex' => 'nullable|string|max:7',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'video_url' => 'nullable|string',
            'coverage' => 'nullable|string',
            'finish' => 'nullable|string',
            'dress_code' => 'nullable|string',
            'durability' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('skus', 'public');
            $validated['image_url'] = $path;
        }

        unset($validated['image']);

        $product->skus()->create($validated);

        return redirect()->route('admin.products.skus.index', $product->id)
            ->with('success', 'Sku created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product, Sku $sku)
    {
        return Inertia::render('Admin/Skus/Edit', [
            'product' => $product,
            'sku' => $sku
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product, Sku $sku)
    {
        $validated = $request->validate([
            'shade_name' => 'required|string|max:255',
            'color_hex' => 'nullable|string|max:7',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'video_url' => 'nullable|string',
            'coverage' => 'nullable|string',
            'finish' => 'nullable|string',
            'dress_code' => 'nullable|string',
            'durability' => 'nullable|string',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('skus', 'public');
            $validated['image_url'] = $path;
        }

        unset($validated['image']);

        $sku->update($validated);

        return redirect()->route('admin.products.skus.index', $product->id)
            ->with('success', 'Sku updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product, Sku $sku)
    {
        $sku->delete();
        return redirect()->back()->with('success', 'Sku deleted successfully.');
    }
}
