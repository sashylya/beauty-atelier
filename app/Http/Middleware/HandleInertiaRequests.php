<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'cartCount' => array_sum($request->session()->get('cart', [])),
            'wishlistCount' => $request->user() ? \Illuminate\Support\Facades\DB::table('favorites')->where('user_id', $request->user()->id)->count() : 0,
            'favoriteProductIds' => $request->user() ? \Illuminate\Support\Facades\DB::table('favorites')->where('user_id', $request->user()->id)->pluck('product_id')->unique()->toArray() : [],
            'favoriteSkuIds' => $request->user() ? $request->user()->favoriteSkus()->pluck('skus.id')->toArray() : [],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'info' => $request->session()->get('info'),
                'two_factor_code' => $request->session()->get('two_factor_code'),
            ],
        ];
    }
}