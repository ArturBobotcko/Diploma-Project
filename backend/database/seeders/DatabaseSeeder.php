<?php

namespace Database\Seeders;

use App\Models\Discipline;
use App\Models\Role;
use App\Models\Student;
use App\Models\StudentClass;
use App\Models\TeacherDiscipline;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Role::create(["name" => "teacher"]);
        Role::create(["name" => "student"]);
        Role::create(["name" => "parent"]);

        StudentClass::create(["number"=> 10, "letter" => 'А']);
        StudentClass::create(["number"=> 7, "letter" => 'Б']);

        Discipline::create(['name' => 'Хор']);
        Discipline::create(['name' => 'Пение']);
        Discipline::create(['name' => 'Сольфеджио']);

        // Родитель (id 1)
        User::create([
            'surname' => 'Воронин',
            'name' => 'Константин',
            'patronym' => 'Николаевич',
            'email' => 'voronin_k@mail.com',
            'role_id' => '3',
            'password' => 123,
        ]);

        // Учитель (id 2)
        User::create([
            'surname' => 'Воронин',
            'name' => 'Николай',
            'patronym' => '',
            'email' => 'voronin_n@mail.com',
            'role_id' => '1',
            'password' => 123,
        ]);

        // Студент 1 (id 3)
        User::create([
            'surname' => 'Воронин',
            'name' => 'Кирилл',
            'patronym' => 'Константинович',
            'email' => 'voronin_kirill@mail.com',
            'role_id' => '2',
            'password' => 123,
        ]);

        // Студент 2 (id 4)
        User::create([
            'surname' => 'Воронин',
            'name' => 'Филипп',
            'patronym' => 'Константинович',
            'email' => 'voronin_f@mail.com',
            'role_id' => '2',
            'password' => 123,
        ]);

        // Студент 3 (id 5)
        User::create([
            'surname' => 'Воронина',
            'name' => 'Маша',
            'patronym' => 'Константиновна',
            'email' => 'voronina_m@mail.com',
            'role_id' => '2',
            'password' => 123,
        ]);

        // Студент 4 (id 6)
        User::create([
            'surname' => 'Воронина',
            'name' => 'Людмила',
            'patronym' => 'Константиновна',
            'email' => 'voronina_l@mail.com',
            'role_id' => '2',
            'password' => 123,
        ]);

        Student::where('id', 3)->update([
            'student_class_id' => 1,
        ]);

        Student::where('id', 4)->update([
            'student_class_id' => 1,
        ]);

        Student::where('id', 5)->update([
            'student_class_id' => 2,
        ]);

        Student::where('id', 6)->update([
            'student_class_id' => 2,
        ]);

        DB::table('parents_students')->insert([
            'parent_id' => 1,
            'student_id' => 3,
        ]);

        DB::table('parents_students')->insert([
            'parent_id' => 1,
            'student_id' => 4,
        ]);

        TeacherDiscipline::create([
            'teacher_id' => 2,
            'discipline_id' => 1,
        ]);

        TeacherDiscipline::create([
            'teacher_id' => 2,
            'discipline_id' => 2,
        ]);

        DB::table('discipline_student_classes')->insert([
            'student_class_id' => 1,
            'teacher_discipline_id' => 1,
        ]);

        DB::table('discipline_student_classes')->insert([
            'student_class_id' => 1,
            'teacher_discipline_id' => 2,
        ]);

        DB::table('discipline_student_classes')->insert([
            'student_class_id' => 2,
            'teacher_discipline_id' => 1,
        ]);

        DB::table('discipline_student_classes')->insert([
            'student_class_id' => 2,
            'teacher_discipline_id' => 2,
        ]);
    }
}
