<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LookOfTheMonth;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LookController extends Controller
{
    public function edit()
    {
        $look = LookOfTheMonth::first() ?? LookOfTheMonth::create([
            'title' => 'Образ месяца',
            'description' => 'Гармония между мягким румянцем рассвета и глянцевым блеском лепестков.',
            'hotspots' => []
        ]);

        $products = Product::select('id', 'name', 'category')->get();

        return Inertia::render('Admin/Look/Edit', [
            'look' => $look,
            'products' => $products
        ]);
    }

    public function update(Request $request)
    {
        $look = LookOfTheMonth::first();
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'hotspots' => 'nullable|array',
            'image' => 'nullable|image|max:2048'
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('looks', 'public');
            $validated['image_path'] = $path;
        }

        unset($validated['image']);
        $look->update($validated);

        return redirect()->back()->with('success', 'Образ месяца обновлен.');
    }
}