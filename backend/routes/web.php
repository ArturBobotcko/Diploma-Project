<?php

use App\Http\Controllers\FileController;
use App\Http\Controllers\HomeworkAssignmentController;
use App\Http\Controllers\StudentClassController;
use App\Http\Controllers\User\StudentController;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::get("/homework_files/{filePath}", [FileController::class,"getFile"]);
Route::get("/getStudentHomeworks/{studentId}", [StudentController::class,"getHomeworks"]);
Route::get("/getHomework/{homeworkId}", [HomeworkAssignmentController::class,"index"]);

require __DIR__.'/auth.php';
