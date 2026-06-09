<?php

namespace App\Http\Controllers;

use App\Models\MasterClass;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MasterClassController extends Controller
{
    public function index()
    {
        $now = now();
        
        $activeMasterClasses = MasterClass::where('date_time', '>=', $now)
            ->orderBy('date_time', 'asc')
            ->paginate(6, ['*'], 'active_page');
        $activeMasterClasses->getCollection()->each->append('available_seats');

        $pastMasterClasses = MasterClass::where('date_time', '<', $now)
            ->orderBy('date_time', 'desc')
            ->paginate(6, ['*'], 'past_page');
        $pastMasterClasses->getCollection()->each->append('available_seats');

        return Inertia::render('MasterClasses/Index', [
            'activeMasterClasses' => $activeMasterClasses,
            'pastMasterClasses' => $pastMasterClasses,
        ]);
    }

    public function show(MasterClass $masterClass)
    {
        return Inertia::render('MasterClasses/Show', [
            'masterClass' => $masterClass->append('available_seats'),
        ]);
    }
}