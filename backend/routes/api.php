<?php

use App\Http\Controllers\Users\UserController;
use App\Models\SocialLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [UserController::class,'me']);
    Route::post('/logout', [AuthController::class,'logout']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/user/{id}', [UserController::class, 'getUserById']);
