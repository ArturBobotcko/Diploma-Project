<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Homework extends Model
{
    use HasFactory;

    protected $table = "homeworks";
    protected $primaryKey = "id";
    protected $fillable = [
        "teacher_discipline_id",
        "student_class_id",
        "desription",
        "deadline"
    ];

    public function assignment(): HasMany
    {
        return $this->hasMany(HomeworkAssigment::class);
    }

    public function discipline(): BelongsTo
    {
        return $this->belongsTo(TeacherDiscipline::class, 'teacher_discipline_id', 'id')->with('discipline');
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(TeacherDiscipline::class, 'teacher_discipline_id', 'id')->with('teacher');
    }
}
