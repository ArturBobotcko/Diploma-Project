<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $rules = [
            'email' => 'required|string|email|unique:users',
            'surname' => 'required|string',
            'name' => 'required|string',
            'role' => 'required|string',
            'school' => 'required|string',
            'password' => 'required|string|confirmed|min:8'
        ];
    
        // Добавляем дополнительные поля для роли "ученик"
        if ($request->input('role') === 'student') {
            $rules['class'] = 'required|string';
        }
    
        $fields = $request->validate($rules);
        
        $user = User::create([
            'email' => $fields['email'],
            'surname' => $fields['surname'],
            'name' => $fields['name'],
            'role' => $fields['role'],
            'school' => $fields['school'],
            'password' => Hash::make($fields['password']),
        ]);

        if ($fields['role'] === 'student') {
            $user->class = $fields['class'];
            $user->save();
        }

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 201);
    }
}
