<?php

namespace Database\Seeders;

use App\Models\Role;
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
        Role::factory()->create(["name" => "teacher"]);
        Role::factory()->create(["name" => "student"]);
        Role::factory()->create(["name" => "parent"]);

        StudentClass::factory()->create([
            "number"=> 4,
            "letter" => "А"
        ]);
        StudentClass::factory()->create([
            "number"=> 7,
            "letter" => "Б"
        ]);
        StudentClass::factory()->create([
            "number"=> 11,
            "letter" => "В"
        ]);

        User::factory(5)->create();
    }
}
