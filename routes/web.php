<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MasterClassController;
use App\Http\Controllers\BookingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\BlogController;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/catalog', [ProductController::class, 'index'])->name('catalog.index');
Route::get('/product/{slug}', [ProductController::class, 'show'])->name('catalog.show');

Route::get('/master-classes', [MasterClassController::class, 'index'])->name('master-classes.index');
Route::get('/master-classes/{masterClass}', [MasterClassController::class, 'show'])->name('master-classes.show');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

Route::post('/orders/webhook', [\App\Http\Controllers\OrderController::class, 'webhook'])->name('orders.webhook');
Route::post('/bookings/webhook', [\App\Http\Controllers\BookingController::class, 'webhook'])->name('bookings.webhook');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        $orders = Auth::user()->orders()->with('items.sku.product')->latest()->get();
        $bookings = Auth::user()->bookings()->with('masterClass')->latest()->get();

        return Inertia::render('Dashboard', [
            'orders' => $orders,
            'bookings' => $bookings,
        ]);
    })->name('dashboard');

    // Корзина (теперь только для авторизованных)
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add/{sku}', [CartController::class, 'add'])->name('cart.add');
    Route::post('/cart/remove/{sku}', [CartController::class, 'remove'])->name('cart.remove');
    Route::patch('/cart/update/{sku}', [CartController::class, 'updateQuantity'])->name('cart.update');
    Route::post('/cart/toggle-packaging', [CartController::class, 'togglePackaging'])->name('cart.toggle-packaging');

    // Заказы
    Route::get('/checkout', [\App\Http\Controllers\OrderController::class, 'checkout'])->name('checkout.index');
    Route::post('/orders', [\App\Http\Controllers\OrderController::class, 'store'])->name('orders.store');
    Route::get('/orders/{order}/success', [\App\Http\Controllers\OrderController::class, 'success'])->name('orders.success');
    Route::post('/orders/{order}/pay', [\App\Http\Controllers\OrderController::class, 'pay'])->name('orders.pay');
    Route::post('/orders/{order}/cancel', [\App\Http\Controllers\OrderController::class, 'cancel'])->name('orders.cancel');

    // Избранное
    Route::get('/wishlist', [\App\Http\Controllers\WishlistController::class, 'index'])->name('wishlist.index');
    Route::post('/wishlist/toggle/{product}', [\App\Http\Controllers\WishlistController::class, 'toggle'])->name('wishlist.toggle');

    Route::post('/master-classes/{masterClass}/book', [BookingController::class, 'store'])->name('master-classes.book');
    Route::post('/bookings/{booking}/pay', [BookingController::class, 'pay'])->name('bookings.pay');
    Route::post('/bookings/{booking}/cancel', [BookingController::class, 'cancel'])->name('bookings.cancel');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/2fa', [ProfileController::class, 'updateTwoFactor'])->name('profile.update-2fa');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'cosmetologist'])->prefix('cosmetologist')->name('cosmetologist.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Cosmetologist/Dashboard');
    })->name('dashboard');
    Route::resource('posts', \App\Http\Controllers\Cosmetologist\PostController::class);
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    Route::resource('products', \App\Http\Controllers\Admin\ProductController::class);
    Route::resource('products.skus', \App\Http\Controllers\Admin\SkuController::class)->except(['show']);
    
    Route::get('/look', [\App\Http\Controllers\Admin\LookController::class, 'edit'])->name('look.edit');
    Route::post('/look', [\App\Http\Controllers\Admin\LookController::class, 'update'])->name('look.update');
    Route::resource('master-classes', \App\Http\Controllers\Admin\MasterClassController::class);
    Route::resource('posts', \App\Http\Controllers\Admin\PostController::class);
    Route::get('/bookings', [\App\Http\Controllers\Admin\BookingController::class, 'index'])->name('bookings.index');
    Route::patch('/bookings/{booking}', [\App\Http\Controllers\Admin\BookingController::class, 'update'])->name('bookings.update');
    Route::delete('/bookings/{booking}', [\App\Http\Controllers\Admin\BookingController::class, 'destroy'])->name('bookings.destroy');

    // Управление пользователями
    Route::get('/users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
    Route::post('/users/{user}/toggle-status', [\App\Http\Controllers\Admin\UserController::class, 'toggleStatus'])->name('users.toggle-status');
});


require __DIR__.'/auth.php';
