<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\ParentModel;
use App\Models\Role;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\SocialLink;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        /**
         * Validate request data and try to login
         */
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response([
                'message' => 'Неправильный адрес и/или пароль'
            ], 422);
        }

        /**
         * Create a API token
         */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'));
    }

    public function register(RegisterRequest $request)
    {
        /**
         * Validate request data and select role id
         */
        $data = $request->validated();
        $role_id = Role::where('name', $data["role"])->first()->id;

        /**
         * Create a record in the 'users' table
         */
        $user = User::create([
            "email" => $data["email"],
            "name" => $data["name"],
            "surname" => $data["surname"],
            "patronym" => $data["patronym"],
            "role_id" => $role_id,
            "password"=> bcrypt($data["password"]),
        ]);

        /**
         * Create a record in the 'social_links' table
         */
        SocialLink::create([
            'user_id' => $user->id,
        ]);

        /**
         * Create a API token
         */
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'));
    }

    public function logout(Request $request)
    {
        /**
         * Get authenticated user and delete API token
         */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
