<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Неправильный адрес и/или пароль'
            ], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'));
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        $user = User::create([
            "email" => $data["email"],
            "name" => $data["name"],
            "surname" => $data["surname"],
            "patronym" => $data["patronym"],
            "role" => $data["role"],
            "school" => $data["school"],
            "student_class" => $data["student_class"],
            "password"=> bcrypt($data["password"]),
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'));
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
