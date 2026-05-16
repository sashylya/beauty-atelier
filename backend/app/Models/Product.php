<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'additional_images' => 'array',
    ];

    public function skus()
    {
        return $this->hasMany(Sku::class);
    }

    public function orderItems()
    {
        return $this->hasManyThrough(OrderItem::class, Sku::class);
    }

    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites')->withTimestamps();
    }

    public function scopeWithTotalSales($query)
    {
        return $query->withSum(['orderItems as total_sales' => function ($query) {
            $query->whereHas('order', function ($q) {
                $q->where('status', '!=', Order::STATUS_CANCELLED);
            });
        }], 'quantity');
    }

    public function scopeTopSellers($query, $limit = 10)
    {
        return $query->whereHas('orderItems', function ($q) {
            $q->whereHas('order', function ($o) {
                $o->where('status', '!=', Order::STATUS_CANCELLED);
            });
        })
            ->withTotalSales()
            ->orderBy('total_sales', 'desc')
            ->take($limit);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function approvedReviews()
    {
        return $this->hasMany(Review::class)->where('is_approved', true);
    }

    public function averageRating()
    {
        return $this->approvedReviews()->avg('rating') ?: 0;
    }

    public function getAverageRatingAttribute()
    {
        return round($this->averageRating(), 1);
    }
}