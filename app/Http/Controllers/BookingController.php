<?php

namespace App\Http\Controllers;

use App\Models\MasterClass;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller
{
    public function store(Request $request, MasterClass $masterClass)
    {
        $request->validate([
            'tickets' => 'required|integer|min:1|max:' . ($masterClass->capacity - $masterClass->bookings()->count()),
        ]);

        if (!Auth::check()) {
            return redirect()->route('login')->with('message', 'Please login to book a master class.');
        }

        $booking = $masterClass->bookings()->create([
            'user_id' => Auth::id(),
            'tickets_count' => $request->tickets,
            'status' => 'confirmed', // In real app, might wait for payment
        ]);

        return redirect()->back()->with('success', 'Master class booked successfully!');
    }
}