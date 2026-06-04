<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // ✅ Roles seed (production ke liye zaroori)
        $this->call([
            RoleSeeder::class,
        ]);

        // ✅ Test user sirf local pe 
        if (app()->environment('local')) {
            User::firstOrCreate(
                ['email' => 'test@example.com'],
                ['name' => 'Test User']
            );
        }
    }
}