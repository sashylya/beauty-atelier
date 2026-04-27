<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CosmetologistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'cosmo@example.com'],
            [
                'name' => 'Елена Прекрасная',
                'password' => Hash::make('password'),
                'is_cosmetologist' => true,
                'specialization' => 'Ведущий дерматолог-косметолог',
                'biography' => 'Специалист с 10-летним стажем в области эстетической медицины. Эксперт по подбору индивидуальных программ ухода и созданию идеальной кожи.',
                'is_active' => true,
                'is_admin' => false,
            ]
        );
    }
}
