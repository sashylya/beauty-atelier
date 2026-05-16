<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterClass extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'date_time' => 'datetime',
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Количество подтвержденных/оплаченных бронирований.
     */
    public function getBookedSeatsCountAttribute()
    {
        return $this->bookings()
            ->whereIn('status', ['pending', 'confirmed', 'paid']) // Учитываем и ожидающие оплаты, чтобы не было овербукинга
            ->sum('tickets_count');
    }

    /**
     * Количество оставшихся мест.
     */
    public function getAvailableSeatsAttribute()
    {
        return max(0, $this->capacity - $this->booked_seats_count);
    }

    /**
     * Проверка, есть ли места.
     */
    public function hasAvailableSeats($count = 1)
    {
        return $this->available_seats >= $count;
    }
}
