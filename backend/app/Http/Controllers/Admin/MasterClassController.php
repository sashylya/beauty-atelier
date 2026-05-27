<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MasterClass;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class MasterClassController extends Controller
{
    public function index(Request $request)
    {
        $mcQuery = MasterClass::latest();
        if ($request->has('mc_status')) {
            if ($request->mc_status === 'upcoming') {
                $mcQuery->where('date_time', '>=', now());
            } elseif ($request->mc_status === 'passed') {
                $mcQuery->where('date_time', '<', now());
            }
        }

        $bookingQuery = \App\Models\Booking::with(['user', 'masterClass'])->latest();
        if ($request->has('booking_status')) {
            $bookingQuery->where('status', $request->booking_status);
        }
        if ($request->has('mc_id')) {
            $bookingQuery->where('master_class_id', $request->mc_id);
        }

        return Inertia::render('Admin/MasterClasses/Index', [
            'masterClasses' => $mcQuery->get(),
            'bookings' => $bookingQuery->get(),
            'filters' => $request->only(['mc_status', 'booking_status', 'mc_id']),
            'allMasterClasses' => MasterClass::orderBy('date_time', 'desc')->get(['id', 'title'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/MasterClasses/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'program' => 'nullable|string',
            'date_time' => 'required|date',
            'price' => 'required|numeric|min:0',
            'capacity' => 'required|integer|min:1',
            'location' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_url'] = $request->file('image')->store('master-classes', 'public');
        }

        unset($validated['image']);

        MasterClass::create($validated);

        return redirect()->route('admin.master-classes.index');
    }

    public function edit(MasterClass $masterClass)
    {
        return Inertia::render('Admin/MasterClasses/Edit', [
            'masterClass' => $masterClass
        ]);
    }

    public function update(Request $request, MasterClass $masterClass)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'program' => 'nullable|string',
            'date_time' => 'required|date',
            'price' => 'required|numeric|min:0',
            'capacity' => 'required|integer|min:1',
            'location' => 'nullable|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($masterClass->image_url) {
                Storage::disk('public')->delete($masterClass->image_url);
            }
            $validated['image_url'] = $request->file('image')->store('master-classes', 'public');
        }

        unset($validated['image']);

        $masterClass->update($validated);

        return redirect()->route('admin.master-classes.index');
    }

    public function destroy(MasterClass $masterClass)
    {
        $masterClass->delete();
        return redirect()->route('admin.master-classes.index');
    }
}
