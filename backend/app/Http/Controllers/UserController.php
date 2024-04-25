<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getUserById($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }
}
