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
        // Revenue typically counts only successful payments from both orders and bookings
        $orderRevenue = Order::whereIn('status', [Order::STATUS_PAID, Order::STATUS_SHIPPED, Order::STATUS_COMPLETED])->sum('total_amount');
        $bookingRevenue = Booking::whereIn('status', [Booking::STATUS_PAID, Booking::STATUS_CONFIRMED])->sum('total_price');
        
        $totalRevenue = $orderRevenue + $bookingRevenue;
        
        $totalUsers = User::count();
        $totalBookings = Booking::count();

        // Data for Charts
        $dates = [];
        for ($i = 6; $i >= 0; $i--) {
            $dateKey = now()->subDays($i)->format('Y-m-d');
            $dates[$dateKey] = [
                'label' => now()->subDays($i)->format('d.m'),
                'count' => 0,
                'total' => 0
            ];
        }

        // Orders per day
        $ordersData = Order::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('status', '!=', Order::STATUS_CANCELLED)
            ->where('created_at', '>=', now()->subDays(6)->startOfDay())
            ->groupBy('date')
            ->pluck('count', 'date')
            ->toArray();

        $bookingsData = Booking::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('status', '!=', Booking::STATUS_CANCELLED)
            ->where('created_at', '>=', now()->subDays(6)->startOfDay())
            ->groupBy('date')
            ->pluck('count', 'date')
            ->toArray();

        // Revenue per day
        $orderRevenueData = Order::selectRaw('DATE(created_at) as date, SUM(total_amount) as total')
            ->where('status', '!=', Order::STATUS_CANCELLED)
            ->where('created_at', '>=', now()->subDays(6)->startOfDay())
            ->groupBy('date')
            ->pluck('total', 'date')
            ->toArray();

        $bookingRevenueData = Booking::selectRaw('DATE(created_at) as date, SUM(total_price) as total')
            ->where('status', '!=', Booking::STATUS_CANCELLED)
            ->where('created_at', '>=', now()->subDays(6)->startOfDay())
            ->groupBy('date')
            ->pluck('total', 'date')
            ->toArray();

        $labels = [];
        $orderCounts = [];
        $revenueTotals = [];

        foreach ($dates as $dateKey => $data) {
            $labels[] = $data['label'];
            
            // Combine orders and bookings count
            $combinedCount = ($ordersData[$dateKey] ?? 0) + ($bookingsData[$dateKey] ?? 0);
            $orderCounts[] = $combinedCount;
            
            // Combine revenue
            $combinedRevenue = (float)($orderRevenueData[$dateKey] ?? 0) + (float)($bookingRevenueData[$dateKey] ?? 0);
            $revenueTotals[] = $combinedRevenue;
        }
            
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalOrders' => $totalOrders,
                'totalRevenue' => $totalRevenue,
                'totalUsers' => $totalUsers,
                'totalBookings' => $totalBookings,
            ],
            'charts' => [
                'labels' => $labels,
                'orders' => $orderCounts,
                'revenue' => $revenueTotals,
            ]
        ]);
    }
}