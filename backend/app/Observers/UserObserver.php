<?php

namespace App\Observers;

use App\Models\ParentModel;
use App\Models\SocialLink;
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
        // TODO: Создать запись соц.сетей
        // TODO: Создать запись
        SocialLink::create([
            "user_id" => $user->id,
        ]);
        $role = $user->role->name;
        switch ($role) {
            case "parent":
                ParentModel::create([
                    "id" => $user->id,
                ]);
                break;
            case "student":
                Student::create([
                    "id"=> $user->id,
                ]);
                break;
            case "teacher":
                Teacher::create([
                    "id"=> $user->id,
                ]);
                break;
            default:
                return;
        }
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
