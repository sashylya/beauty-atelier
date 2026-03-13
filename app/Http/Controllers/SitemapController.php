<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\MasterClass;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $products = Product::all();
        $masterClasses = MasterClass::all();

        return response()->view('sitemap', [
            'products' => $products,
            'masterClasses' => $masterClasses,
        ])->header('Content-Type', 'text/xml');
    }
}
