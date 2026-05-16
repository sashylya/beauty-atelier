<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoginLog extends Model
{
    protected $fillable = [
        'email',
        'ip_address',
        'user_agent',
        'is_successful',
        'error_message',
    ];
}
