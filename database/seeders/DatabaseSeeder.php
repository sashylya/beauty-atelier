<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Sku;
use App\Models\MasterClass;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@atelier.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
                'is_admin' => true,
            ]
        );

        User::updateOrCreate(
            ['email' => 'user@atelier.com'],
            [
                'name' => 'Auth User',
                'password' => bcrypt('password'),
                'is_admin' => false,
            ]
        );

        // Products
        $p1 = Product::firstOrCreate(
            ['slug' => 'Сияющая тональная основа'],
            [
                'name' => 'Сияющая тональная основа для лица',
                'description' => 'Невесомая тональная основа, создающая естественное сияющее покрытие.',
                'category' => 'face',
                'is_hit' => true,
            ]
        );

        if ($p1->wasRecentlyCreated) {
            $p1->skus()->createMany([
                [
                    'shade_name' => 'Fair Neutral',
                    'color_hex' => '#F5E1D2',
                    'price' => 4500.00,
                    'stock' => 10,
                    'coverage' => 'light',
                    'finish' => 'luminous',
                    'dress_code' => 'Business Casual',
                ],
                [
                    'shade_name' => 'Light Sand',
                    'color_hex' => '#E8CBB3',
                    'price' => 4500.00,
                    'stock' => 5,
                    'coverage' => 'light',
                    'finish' => 'luminous',
                    'dress_code' => 'Business Casual',
                ]
            ]);
        }

        $p2 = Product::firstOrCreate(
            ['slug' => 'Губная помада'],
            [
                'name' => 'Губная помада',
                'description' => 'Высокопигментированная помада с комфортным матовым финишем.',
                'category' => 'lips',
                'is_look_of_month' => true,
            ]
        );

        if ($p2->wasRecentlyCreated) {
            $p2->skus()->createMany([
                [
                    'shade_name' => 'Classic Red',
                    'color_hex' => '#B22222',
                    'price' => 2800.00,
                    'stock' => 20,
                    'coverage' => 'full',
                    'finish' => 'matte',
                    'dress_code' => 'Black Tie',
                ],
                [
                    'shade_name' => 'Dusty Rose',
                    'color_hex' => '#D8A1A1',
                    'price' => 2800.00,
                    'stock' => 15,
                    'coverage' => 'full',
                    'finish' => 'matte',
                    'dress_code' => 'Business Casual',
                ]
            ]);
        }

        // Master Classes
        MasterClass::firstOrCreate(
            ['title' => 'Мастер-класс: Идеальный красный'],
            [
                'description' => 'Узнайте, как создать идеальный макияж губ с красной помадой, который продержится всю ночь.',
                'date_time' => now()->addDays(7)->setHour(18)->setMinute(0),
                'capacity' => 10,
                'price' => 3000.00,
                'location' => 'Главное Ателье, Москва',
            ]
        );

        MasterClass::firstOrCreate(
            ['title' => 'Основы нюдового макияжа'],
            [
                'description' => 'Освойте искусство макияжа "без макияжа" с нашими экспертами.',
                'date_time' => now()->addDays(14)->setHour(14)->setMinute(0),
                'capacity' => 8,
                'price' => 2500.00,
                'location' => 'Главное Ателье, Москва',
            ]
        );
    }
}