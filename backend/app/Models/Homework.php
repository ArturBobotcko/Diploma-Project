<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Homework extends Model
{
    use HasFactory;

    protected $primaryKey = "homework_id";
    protected $table = "homeworks";
    protected $fillable = [
        "description",
        "is_done",
    ];
}
