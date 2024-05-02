<?php

use App\Models\Student;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return;
});

Route::get('/students', function () {
    $students = Student::find(1);
    // dd($students);
    return $students->toJson();
});
