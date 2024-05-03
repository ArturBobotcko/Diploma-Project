<?php

namespace Database\Seeders;

use App\Models\StudentClass;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        StudentClass::factory(3)->create();
    }
}
