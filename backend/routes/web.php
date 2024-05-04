<?php

use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;

Route::get("/user/{id}", [UserController::class, "getUserById"]);

require __DIR__.'/auth.php';
