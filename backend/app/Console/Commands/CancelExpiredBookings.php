<?php

namespace App\Console\Commands;

use App\Models\Booking;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class CancelExpiredBookings extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bookings:cancel-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Отмена неоплаченных бронирований мастер-классов старше 30 минут';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $expiredCount = Booking::where('status', Booking::STATUS_PENDING)
            ->where('created_at', '<', now()->subMinutes(30))
            ->update(['status' => Booking::STATUS_CANCELLED]);

        if ($expiredCount > 0) {
            $this->info("Автоматически отменено {$expiredCount} просроченных бронирований.");
            Log::info("Booking Cleanup: Cancelled {$expiredCount} expired pending bookings.");
        }
    }
}
