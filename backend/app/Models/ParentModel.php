<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentModel extends Model
{
    use HasFactory;

    protected $table = "parents";
    protected $primaryKey = "parent_id";
    protected $fillable = [
        "surname",
        "name",
        "patronym",
        "email",
        "phone_number",
    ];

    protected $hidden = [
        "password",
    ];
}
