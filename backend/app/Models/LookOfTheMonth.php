<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LookOfTheMonth extends Model
{
    protected $table = 'look_of_the_month';
    protected $guarded = [];

    protected $casts = [
        'hotspots' => 'array',
        'is_active' => 'boolean',
    ];
}