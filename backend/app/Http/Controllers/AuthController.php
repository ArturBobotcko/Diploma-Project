<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Throwable;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $rules = [
                'email' => 'required|email|unique:users,email',
                'surname' => 'required|string|regex:/^[^\d]+$/u',
                'name' => 'required|string|regex:/^[^\d]+$/u',
                'patronym' => 'nullable|string|regex:/^[^\d]+$/u',
                'role' => 'required|string',
                'school' => 'required|string',
                'password' => [
                    'required',
                    'string',
                    'confirmed',
                    'min:8',
                    'regex:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/',
                ],
            ];

            if ($request->input('role') === 'student') {
                $rules['student_class'] = 'required|string';
            }

            $validateUser = Validator::make($request->all(), $rules);

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 422);
            };

            $user = User::create([
                'email' => $request->email,
                'surname' => $request->surname,
                'name' => $request->name,
                'patronym' => $request->patronym,
                'role' => $request->role,
                'school' => $request->school,
                'password' => $request->password,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User created successfully'
            ], 200);
        } catch (Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $rules = [
                'email' => 'required|email',
                'password' => 'required',
            ];

            $validateUser = Validator::make($request->all(), $rules);

            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            };

            if (!Auth::attempt($request->only(['email', 'password']))) {
                return response()->json([
                    'status' => false,
                    'message' => 'Email or password does not match with our record',
                    'errors' => [
                        'email' => ['Неверная почта и/или пароль. Проверьте правильность введенных данных']
                    ]
                ], 401);
            }

            $user = User::where('email', $request->email)->first();
            return response()->json([
                'status' => true,
                'message' => 'User logged in successfully',
                'token' => $user->createToken("API Token")->plainTextToken
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function profile()
    {
        $userData = auth()->user();
        return response()->json([
            'status' => true,
            'message' => 'Profile information',
            'data' => $userData,
            'id' => auth()->user()->id
        ], 200);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => true,
            'message' => 'User logged out',
            'data' => [],
        ], 200);
    }
}
