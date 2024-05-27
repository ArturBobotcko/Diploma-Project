<?php

use App\Http\Controllers\StudentClassController;
use App\Http\Controllers\User\StudentController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::get("/user/{id}", [UserController::class, "getUserById"]);
Route::get("/getStudentsFromClass/{id}", [StudentClassController::class,"getStudents"]);
Route::get("/getStudentHomeworks/{id}", [StudentController::class,"getHomeworks"]);

require __DIR__.'/auth.php';
