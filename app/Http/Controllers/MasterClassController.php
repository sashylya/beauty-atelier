<?php

namespace App\Http\Controllers;

use App\Models\MasterClass;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MasterClassController extends Controller
{
    public function index()
    {
        $masterClasses = MasterClass::orderBy('date_time')->get()->each->append('available_seats');

        return Inertia::render('MasterClasses/Index', [
            'masterClasses' => $masterClasses,
        ]);
    }

    public function show(MasterClass $masterClass)
    {
        return Inertia::render('MasterClasses/Show', [
            'masterClass' => $masterClass->append('available_seats'),
        ]);
    }
}