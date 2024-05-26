<?php

namespace Database\Seeders;

use App\Models\Discipline;
use App\Models\Role;
use App\Models\Student;
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
        // User::factory(10)->create();
        Role::create(["name" => "teacher"]);
        Role::create(["name" => "student"]);
        Role::create(["name" => "parent"]);
        StudentClass::create(["number"=> 10, "letter" => 'А']);
        StudentClass::create(["number"=> 7, "letter" => 'Б']);
        Discipline::create(['name' => 'Хор']);
        Discipline::create(['name' => 'Пение']);
        Discipline::create(['name' => 'Сольфеджио']);
    }
}
