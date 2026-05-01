<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with(['user', 'items.sku.product'])->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $orders = $query->paginate(20)->withQueryString();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => $request->only(['status']),
            'statuses' => [
                Order::STATUS_NEW => 'Новый',
                Order::STATUS_PAID => 'Оплачен',
                Order::STATUS_PACKED => 'Собран',
                Order::STATUS_SHIPPED => 'Отправлен',
                Order::STATUS_COMPLETED => 'Выполнен',
                Order::STATUS_CANCELLED => 'Отменен',
            ]
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|string|in:new,paid,packed,shipped,completed,cancelled'
        ]);

        $oldStatus = $order->status;
        $newStatus = $request->status;

        // Если заказ отменяется, нужно вернуть товар на склад
        if ($newStatus === Order::STATUS_CANCELLED && $oldStatus !== Order::STATUS_CANCELLED) {
            $order->restoreStock();
        } 
        // Если заказ восстанавливается из отмененного, нужно снова уменьшить склад (если есть)
        elseif ($oldStatus === Order::STATUS_CANCELLED && $newStatus !== Order::STATUS_CANCELLED) {
            $order->reduceStock();
        }

        $order->update(['status' => $newStatus]);

        return back()->with('success', 'Статус заказа обновлен.');
    }
}
