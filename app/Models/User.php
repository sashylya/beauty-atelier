<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property bool $is_admin
 * @property bool $is_cosmetologist
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $blocked_at
 * @property \Illuminate\Support\Carbon|null $last_login_at
 * @property string|null $two_factor_code
 * @property \Illuminate\Support\Carbon|null $two_factor_expires_at
 * @property bool $is_two_factor_enabled
 */
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'is_cosmetologist',
        'specialization',
        'biography',
        'avatar',
        'is_active',
        'blocked_at',
        'last_login_at',
        'two_factor_code',
        'two_factor_expires_at',
        'is_two_factor_enabled',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_admin' => 'boolean',
            'is_cosmetologist' => 'boolean',
            'is_active' => 'boolean',
            'blocked_at' => 'datetime',
            'last_login_at' => 'datetime',
            'two_factor_expires_at' => 'datetime',
            'is_two_factor_enabled' => 'boolean',
        ];
    }

    public function generateTwoFactorCode()
    {
        $this->two_factor_code = rand(100000, 999999);
        $this->two_factor_expires_at = now()->addMinutes(10);
        $this->save();
    }

    public function resetTwoFactorCode()
    {
        $this->two_factor_code = null;
        $this->two_factor_expires_at = null;
        $this->save();
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Логи входа пользователя.
     */
    public function loginLogs()
    {
        return $this->hasMany(LoginLog::class, 'email', 'email');
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function favoriteProducts()
    {
        return $this->belongsToMany(Product::class, 'favorites')->withTimestamps();
    }

    public function favoriteSkus()
    {
        return $this->belongsToMany(Sku::class, 'favorites')->withTimestamps();
    }
}
