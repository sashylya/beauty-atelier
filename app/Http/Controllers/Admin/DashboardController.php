<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\MasterClass;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Basic Stats - Exclude cancelled orders
        $totalOrders = Order::where('status', '!=', Order::STATUS_CANCELLED)->count();
        // Revenue typically counts only successful payments
        $totalRevenue = Order::whereIn('status', [Order::STATUS_PAID, Order::STATUS_SHIPPED, Order::STATUS_COMPLETED])->sum('total_amount');
        $totalUsers = User::count();
        $totalBookings = Booking::count();

        // Data for Charts
        // Orders per day for the last 7 days (Excluding cancelled)
        $ordersLast7Days = Order::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('status', '!=', Order::STATUS_CANCELLED)
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Revenue per day for the last 7 days (Only paid/shipped/completed)
        $revenueLast7Days = Order::selectRaw('DATE(created_at) as date, SUM(total_amount) as total')
            ->whereIn('status', [Order::STATUS_PAID, Order::STATUS_SHIPPED, Order::STATUS_COMPLETED])
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date')
            ->get();
            
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalOrders' => $totalOrders,
                'totalRevenue' => $totalRevenue,
                'totalUsers' => $totalUsers,
                'totalBookings' => $totalBookings,
            ],
            'charts' => [
                'orders' => [
                    'labels' => $ordersLast7Days->pluck('date'),
                    'data' => $ordersLast7Days->pluck('count'),
                ],
                'revenue' => [
                    'labels' => $revenueLast7Days->pluck('date'),
                    'data' => $revenueLast7Days->pluck('total'),
                ]
            ]
        ]);
    }
}