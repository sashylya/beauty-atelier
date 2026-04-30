<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Order extends Model
{
    use HasFactory;

    protected $guarded = [];

    const STATUS_NEW = 'new';
    const STATUS_PAID = 'paid';
    const STATUS_SHIPPED = 'shipped';
    const STATUS_COMPLETED = 'completed';
    const STATUS_CANCELLED = 'cancelled';

    protected $casts = [
        'paid_at' => 'datetime',
        'is_gift' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Уменьшить количество товара на складе для всех позиций заказа.
     */
    public function reduceStock()
    {
        DB::transaction(function () {
            foreach ($this->items as $item) {
                $item->sku->decrement('stock', $item->quantity);
            }
        });
    }

    /**
     * Вернуть количество товара на склад.
     */
    public function restoreStock()
    {
        DB::transaction(function () {
            foreach ($this->items as $item) {
                $item->sku->increment('stock', $item->quantity);
            }
        });
    }
}
