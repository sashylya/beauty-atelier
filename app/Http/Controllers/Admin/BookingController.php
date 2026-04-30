<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => Booking::with(['user', 'masterClass'])
                ->latest()
                ->get()
        ]);
    }

    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,paid,confirmed,cancelled',
        ]);

        $booking->update($validated);

        return redirect()->back()->with('success', 'Статус бронирования обновлен.');
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
        return redirect()->back();
    }
}
