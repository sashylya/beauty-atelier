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