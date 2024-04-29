<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getUserById(string $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(["message"=> "Такого пользователя не существует"],404);
        }

        return response(compact('user','id'));
    }
}
