<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\ParentModel;
use App\Models\SocialLink;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function getUserById(string $id)
    {
        $user = User::find($id);
        if ($user === null) {
            return response()->json(["message"=> "Unknown user"],404);
        }
        $user->role;
        $user->socialLinks;
        if ($user->role->name === "student") {
            $user->student->studentClass;
            foreach($user->student->parents as $parent)
            {
                $parent->user;
            }
        } else if ($user->role->name === "parent") {
            foreach($user->parent->children as $student)
            {
                $student->user;
            }
        }
        return response()->json(["user" => $user]);
    }

    public function getAuthUser(Request $request)
    {
        return response()->json(["user"=> $request->user(), "social_links" => SocialLink::where("user_id", $request->user()->id)->get()]);
    }
}
