<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($booking) {
            $booking->ticket_code = 'TKT-' . strtoupper(bin2hex(random_bytes(4)));
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function masterClass()
    {
        return $this->belongsTo(MasterClass::class);
    }
}