<?php

use App\Http\Controllers\HomeworkAssignmentController;
use App\Http\Controllers\StudentClassController;
use App\Http\Controllers\User\ParentController;
use App\Http\Controllers\User\StudentController;
use App\Http\Controllers\User\UserController;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(["auth:sanctum"])->group(function () {
    Route::get("/user/{userId}", [UserController::class, "getUserById"]);
    Route::get("/user", [UserController::class,"getAuthUser"]);
    Route::get("/getStudentDisciplines/{studentId}", [UserController::class,"getDisciplines"]);

    Route::get("/getStudentsFromClass/{studentClassId}", [StudentClassController::class,"getStudents"]);

    Route::post("/grade-student", [StudentController::class,"gradeStudent"]);
    Route::get("/getStudentHomeworks/{studentId}", [StudentController::class,"getHomeworks"]);

    Route::post("/answerStudentHomework/{homeworkAssignmentId}", [HomeworkAssignmentController::class, "submit"]);
    Route::get("/getHomework/{homeworkId}", [HomeworkAssignmentController::class,"index"]);
});
