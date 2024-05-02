<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentClass extends Model
{
    use HasFactory;

    protected $primaryKey = "student_class_id";
    protected $table = "student_classes";
    protected $fillable = [
        "student_class_number",
        "student_class_letter",
    ];
}
