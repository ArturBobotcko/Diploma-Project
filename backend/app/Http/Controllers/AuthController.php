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
        // Валидация полей формы
        $rules = [
            'email' => 'required|string|email|unique:users',
            'surname' => 'required|string',
            'name' => 'required|string',
            'patronym' => 'nullable|string',
            'role' => 'required|string',
            'school' => 'required|string',
            'password' => 'required|string|confirmed|min:8'
        ];
    
        // Добавляем дополнительные поля для роли "ученик"
        if ($request->input('role') === 'student') {
            $rules['class'] = 'required|string';
        }
    
        $fields = $request->validate($rules);
        
        // Создание пользователя
        $user = User::create([
            'email' => $fields['email'],
            'surname' => $fields['surname'],
            'name' => $fields['name'],
            'patronym' => $fields['patronym'],
            'role' => $fields['role'],
            'school' => $fields['school'],
            'password' => Hash::make($fields['password']),
        ]);

        if ($fields['role'] === 'student') {
            $user->class = $fields['class'];
            $user->save(); // Сохранение пользователя в БД
        }

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 201)->header('Access-Control-Allow-Origin', 'http://localhost:3000');
    }
}
