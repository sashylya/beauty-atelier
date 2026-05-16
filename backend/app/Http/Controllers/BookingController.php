<?php

namespace App\Http\Controllers;

use App\Models\MasterClass;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BookingController extends Controller
{
    public function store(Request $request, MasterClass $masterClass)
    {
        $request->validate([
            'tickets' => 'required|integer|min:1',
        ]);

        // Проверяем, нет ли уже бронирования у этого пользователя на этот МК
        $existingBooking = Booking::where('user_id', Auth::id())
            ->where('master_class_id', $masterClass->id)
            ->whereIn('status', [Booking::STATUS_PENDING, Booking::STATUS_PAID, Booking::STATUS_CONFIRMED])
            ->first();

        if ($existingBooking) {
            $message = $existingBooking->status === Booking::STATUS_PENDING 
                ? 'У вас уже есть неоплаченное бронирование на этот мастер-класс.' 
                : 'Вы уже приобрели билет на этот мастер-класс.';
            
            return redirect()->back()->with('error', $message);
        }

        if (!$masterClass->hasAvailableSeats($request->tickets)) {
            return redirect()->back()->with('error', 'К сожалению, мест больше нет.');
        }

        $totalPrice = $masterClass->price * $request->tickets;

        $booking = $masterClass->bookings()->create([
            'user_id' => Auth::id(),
            'tickets_count' => $request->tickets,
            'total_price' => $totalPrice,
            'status' => Booking::STATUS_PENDING,
        ]);

        return $this->processPayment($booking);
    }

    public function pay(Booking $booking)
    {
        if ($booking->user_id !== Auth::id()) {
            abort(403);
        }

        if ($booking->status !== Booking::STATUS_PENDING) {
            return redirect()->back()->with('error', 'Это бронирование нельзя оплатить.');
        }

        return $this->processPayment($booking);
    }

    private function processPayment(Booking $booking)
    {
        $shopId = config('services.yookassa.shop_id');
        $secretKey = config('services.yookassa.secret_key');

        if (!$shopId || !$secretKey) {
            return redirect()->route('dashboard')->with('success', 'Место забронировано, но оплата временно недоступна.');
        }

        $response = Http::withBasicAuth($shopId, $secretKey)
            ->withoutVerifying()
            ->withHeaders(['Idempotence-Key' => Str::random(64)])
            ->post('https://api.yookassa.ru/v3/payments', [
                'amount' => [
                    'value' => number_format($booking->total_price, 2, '.', ''),
                    'currency' => 'RUB',
                ],
                'confirmation' => [
                    'type' => 'redirect',
                    'return_url' => route('dashboard'), // Вернем в кабинет
                ],
                'capture' => true,
                'description' => "Оплата мастер-класса: {$booking->masterClass->title}",
                'metadata' => [
                    'booking_id' => $booking->id,
                ],
            ]);

        if ($response->successful()) {
            $payment = $response->json();
            $booking->update([
                'payment_id' => $payment['id'],
                'payment_url' => $payment['confirmation']['confirmation_url'],
            ]);

            return Inertia::location($payment['confirmation']['confirmation_url']);
        }

        Log::error('YooKassa Booking Error: ' . $response->body());
        return redirect()->route('dashboard')->with('error', 'Ошибка при создании платежа.');
    }

    public function cancel(Booking $booking)
    {
        if ($booking->user_id !== Auth::id()) {
            abort(403);
        }

        if ($booking->status === Booking::STATUS_PAID) {
            return redirect()->back()->with('error', 'Оплаченное бронирование нельзя отменить самостоятельно.');
        }

        $booking->update(['status' => Booking::STATUS_CANCELLED]);

        return redirect()->back()->with('success', 'Бронирование отменено.');
    }

    public function checkStatus(Booking $booking)
    {
        if (!$booking->payment_id || $booking->status !== Booking::STATUS_PENDING) {
            return $booking;
        }

        $shopId = config('services.yookassa.shop_id');
        $secretKey = config('services.yookassa.secret_key');

        if (!$shopId || !$secretKey) {
            return $booking;
        }

        try {
            $response = Http::withBasicAuth($shopId, $secretKey)
                ->withoutVerifying()
                ->get("https://api.yookassa.ru/v3/payments/{$booking->payment_id}");

            if ($response->successful()) {
                $payment = $response->json();
                if ($payment['status'] === 'succeeded') {
                    $booking->update([
                        'status' => Booking::STATUS_PAID,
                        'paid_at' => now(),
                    ]);
                } elseif ($payment['status'] === 'canceled') {
                    // Можно сбросить payment_id чтобы можно было попробовать снова
                    $booking->update([
                        'payment_id' => null,
                        'payment_url' => null,
                    ]);
                }
            }
        } catch (\Exception $e) {
            Log::error('YooKassa Status Check Error: ' . $e->getMessage());
        }

        return $booking;
    }

    public function webhook(Request $request)
    {
        $source = $request->all();
        
        if ($source['event'] === 'payment.succeeded') {
            $payment = $source['object'];
            $bookingId = $payment['metadata']['booking_id'] ?? null;
            
            if ($bookingId) {
                $booking = Booking::find($bookingId);
                if ($booking && $booking->status !== Booking::STATUS_PAID) {
                    $booking->update([
                        'status' => Booking::STATUS_PAID,
                        'paid_at' => now(),
                    ]);
                }
            }
        }

        return response('OK', 200);
    }

    public function ticket(Booking $booking)
    {
        if ($booking->user_id !== Auth::id() && !Auth::user()->is_admin) {
            abort(403);
        }

        if ($booking->status !== Booking::STATUS_PAID && $booking->status !== Booking::STATUS_CONFIRMED) {
            return redirect()->route('dashboard')->with('error', 'Билет доступен только после оплаты.');
        }

        $booking->load('masterClass', 'user');

        // Генерируем URL для QR-кода (например, ссылка на проверку билета или просто код)
        // Для простоты пока просто код
        $qrCodeUrl = "https://quickchart.io/qr?text=" . urlencode($booking->ticket_code) . "&size=200&margin=0";

        return Inertia::render('Bookings/Ticket', [
            'booking' => $booking,
            'qrCodeUrl' => $qrCodeUrl,
        ]);
    }
}
