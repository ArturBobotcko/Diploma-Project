<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $table = "lessons";
    protected $primaryKey = "lession_id";
    protected $fillable = [
        "lesson_name",
        "date",
    ];
}
