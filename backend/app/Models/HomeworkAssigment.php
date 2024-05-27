<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomeworkAssigment extends Model
{
    use HasFactory;
    protected $table = "homework_assignments";
    protected $primaryKey = "id";
    protected $fillable = [
        "homework_id",
        "student_id",
        "completion_status",
        "response_text",
        "file_path"
    ];
}
