<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\SocialLink;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getUserById(string $id)
    {
        $user = User::find($id);
        $social_links = SocialLink::where("user_id", $user->id)->get();

        if (!$user) {
            return response()->json(["message"=> "Такого пользователя не существует"],404);
        }

        return response(compact('user','social_links'));
    }

    public function me(Request $request)
    {
        $user = $request->user();
        $social_links = SocialLink::where('user_id', $user->id)->get();

        if (!$user) {
            return response()->json(["message"=> "Такого пользователя не существует"],404);
        }

        return response(compact('user','social_links'));
    }
}
