<?php

namespace App\Observers;

use App\Models\ParentModel;
use App\Models\Role;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        $role = Role::find($user->role_id);
        switch ($role["name"]) {
            case 'teacher':
                Teacher::create([
                    "id" => $user->id,
                ]);
                break;
            case "student":
                Student::create([
                    "id" => $user->id,
                ]);
                break;
            case "parent":
                ParentModel::create([
                    "id"=> $user->id,
                ]);
                break;
            default:
                break;
        };
        return;
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        //
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        //
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
