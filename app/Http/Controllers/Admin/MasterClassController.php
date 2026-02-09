<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MasterClass;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MasterClassController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/MasterClasses/Index', [
            'masterClasses' => MasterClass::latest()->get(),
            'bookings' => \App\Models\Booking::with(['user', 'masterClass'])->latest()->get()
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
        ]);

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
        ]);

        $masterClass->update($validated);

        return redirect()->route('admin.master-classes.index');
    }

    public function destroy(MasterClass $masterClass)
    {
        $masterClass->delete();
        return redirect()->route('admin.master-classes.index');
    }
}
