<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Sku;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        $cart = $request->session()->get('cart', []);
        if (empty($cart)) {
            return redirect()->route('cart.index');
        }

        $items = [];
        $subtotal = 0;
        foreach ($cart as $skuId => $quantity) {
            $sku = Sku::with('product')->find($skuId);
            if ($sku) {
                if ($sku->stock < $quantity) {
                     return redirect()->route('cart.index')->with('error', "К сожалению, товара {$sku->product->name} ({$sku->shade_name}) недостаточно на складе.");
                }
                $items[] = [
                    'sku' => $sku,
                    'quantity' => $quantity,
                ];
                $subtotal += $sku->price * $quantity;
            }
        }

        $deliveryThreshold = 2000;
        $deliveryFee = 200;
        $isDeliveryFree = $subtotal >= $deliveryThreshold;
        $currentDeliveryFee = ($subtotal > 0 && !$isDeliveryFree) ? $deliveryFee : 0;
        
        $total = $subtotal + $currentDeliveryFee;

        return Inertia::render('Checkout/Index', [
            'items' => $items,
            'total' => $total,
            'subtotal' => $subtotal,
            'deliveryFee' => $currentDeliveryFee,
            'isDeliveryFree' => $isDeliveryFree
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'city' => 'required|string|max:100|min:2',
            'street' => 'required|string|max:255|min:2',
            'house' => 'required|numeric|max_digits:10',
            'apartment' => 'required|numeric|max_digits:10',
        ]);

        $cart = $request->session()->get('cart', []);
        if (empty($cart)) {
            return redirect()->route('cart.index');
        }

        return DB::transaction(function () use ($request, $cart) {
            $subtotal = 0;
            $itemsToCreate = [];

            foreach ($cart as $skuId => $quantity) {
                $sku = Sku::lockForUpdate()->find($skuId);
                if (!$sku || $sku->stock < $quantity) {
                    throw new \Exception("Недостаточно товара на складе.");
                }
                
                $itemsToCreate[] = [
                    'sku_id' => $sku->id,
                    'quantity' => $quantity,
                    'price' => $sku->price,
                ];
                $subtotal += $sku->price * $quantity;
            }

            $deliveryThreshold = 2000;
            $deliveryFee = 200;
            $isDeliveryFree = $subtotal >= $deliveryThreshold;
            $currentDeliveryFee = ($subtotal > 0 && !$isDeliveryFree) ? $deliveryFee : 0;
            $total = $subtotal + $currentDeliveryFee;

            $shippingAddress = "г. {$request->city}, ул. {$request->street}, д. {$request->house}";
            if ($request->apartment) {
                $shippingAddress .= ", кв. {$request->apartment}";
            }

            $order = Order::create([
                'user_id' => auth()->id(),
                'total_amount' => $total,
                'status' => Order::STATUS_NEW,
                'shipping_address' => $shippingAddress,
            ]);

            foreach ($itemsToCreate as $itemData) {
                $order->items()->create($itemData);
            }

            // Уменьшаем остатки сразу при создании (бронирование)
            $order->reduceStock();

            // Очищаем корзину сразу после создания заказа
            $request->session()->forget(['cart', 'wants_packaging']);

            // Интеграция с ЮKassa
            $payment = $this->createYookassaPayment($order);

            if ($payment && isset($payment['confirmation']['confirmation_url'])) {
                $order->update([
                    'payment_id' => $payment['id'],
                    'payment_url' => $payment['confirmation']['confirmation_url'],
                ]);

                return Inertia::location($payment['confirmation']['confirmation_url']);
            }

            return redirect()->route('dashboard')->with('success', 'Заказ создан, но оплата временно недоступна.');
        });
    }

    private function createYookassaPayment(Order $order)
    {
        $shopId = config('services.yookassa.shop_id');
        $secretKey = config('services.yookassa.secret_key');

        if (!$shopId || !$secretKey) {
            return null;
        }

        $response = Http::withBasicAuth($shopId, $secretKey)
            ->withoutVerifying()
            ->withHeaders(['Idempotence-Key' => Str::random(64)])
            ->post('https://api.yookassa.ru/v3/payments', [
                'amount' => [
                    'value' => number_format($order->total_amount, 2, '.', ''),
                    'currency' => 'RUB',
                ],
                'confirmation' => [
                    'type' => 'redirect',
                    'return_url' => route('orders.success', $order->id),
                ],
                'capture' => true,
                'description' => "Оплата заказа №{$order->id} в Beauty Atelier",
                'metadata' => [
                    'order_id' => $order->id,
                ],
            ]);

        if ($response->failed()) {
            Log::error('YooKassa API Error: ' . $response->body());
            return null;
        }

        return $response->json();
    }

    public function success(Order $order)
    {
        // В реальном приложении здесь стоит проверить статус платежа через API ЮKassa, 
        // но лучше полагаться на Вебхук.
        return Inertia::render('Checkout/Success', [
            'order' => $order->load('items.sku.product')
        ]);
    }

    public function pay(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        if ($order->status !== Order::STATUS_NEW) {
            return redirect()->back()->with('error', 'Этот заказ нельзя оплатить.');
        }

        if (!$order->payment_url) {
            $payment = $this->createYookassaPayment($order);
            if ($payment && isset($payment['confirmation']['confirmation_url'])) {
                $order->update([
                    'payment_id' => $payment['id'],
                    'payment_url' => $payment['confirmation']['confirmation_url'],
                ]);
            } else {
                return redirect()->back()->with('error', 'Не удалось связаться с ЮKassa. Попробуйте позже.');
            }
        }

        return Inertia::location($order->payment_url);
    }

    public function cancel(Order $order)
    {
        if ($order->user_id !== auth()->id()) {
            abort(403);
        }

        if ($order->status === Order::STATUS_CANCELLED) {
            return redirect()->back()->with('error', 'Заказ уже отменен.');
        }

        if ($order->status === Order::STATUS_PACKED || $order->status === Order::STATUS_SHIPPED || $order->status === Order::STATUS_COMPLETED) {
             return redirect()->back()->with('error', 'Заказ уже собирается или отправлен, его нельзя отменить самостоятельно. Обратитесь в поддержку.');
        }

        DB::transaction(function () use ($order) {
            $order->update(['status' => Order::STATUS_CANCELLED]);
            $order->restoreStock();
        });

        $message = 'Заказ отменен, товары возвращены на склад.';
        if ($order->status === Order::STATUS_PAID) {
            $message .= ' Средства будут возвращены на вашу карту в течение нескольких дней.';
        }

        return redirect()->back()->with('success', $message);
    }

    public function checkStatus(Order $order)
    {
        if (!$order->payment_id || $order->status !== Order::STATUS_NEW) {
            return $order;
        }

        $shopId = config('services.yookassa.shop_id');
        $secretKey = config('services.yookassa.secret_key');

        if (!$shopId || !$secretKey) {
            return $order;
        }

        try {
            $response = Http::withBasicAuth($shopId, $secretKey)
                ->withoutVerifying()
                ->get("https://api.yookassa.ru/v3/payments/{$order->payment_id}");

            if ($response->successful()) {
                $payment = $response->json();
                if ($payment['status'] === 'succeeded') {
                    $order->update([
                        'status' => Order::STATUS_PAID,
                        'paid_at' => now(),
                    ]);
                } elseif ($payment['status'] === 'canceled') {
                    $order->update([
                        'payment_id' => null,
                        'payment_url' => null,
                    ]);
                }
            }
        } catch (\Exception $e) {
            Log::error('YooKassa Order Status Check Error: ' . $e->getMessage());
        }

        return $order;
    }

    public function webhook(Request $request)
    {
        $source = $request->all();
        
        if ($source['event'] === 'payment.succeeded') {
            $payment = $source['object'];
            $orderId = $payment['metadata']['order_id'] ?? null;
            
            if ($orderId) {
                $order = Order::find($orderId);
                if ($order && $order->status !== Order::STATUS_PAID) {
                    $order->update([
                        'status' => Order::STATUS_PAID,
                        'paid_at' => now(),
                    ]);
                }
            }
        }

        return response('OK', 200);
    }
}
