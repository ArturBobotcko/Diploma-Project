<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class StudentClass extends Model
{
    use HasFactory;

    protected $table = "student_classes";
    protected $primaruKey = "id";
    protected $fillable = [
        "number",
        "letter",
    ];

    public function disciplines(): BelongsToMany
    {
        return $this->belongsToMany(Discipline::class, 'discipline_student_classes', 'student_class_id', 'teacher_discipline_id')
                    ->join('teachers_disciplines as td', 'discipline_student_classes.teacher_discipline_id', '=', 'td.id')
                    ->join('disciplines as d', 'td.discipline_id', '=', 'd.id')
                    ->select('d.*');
    }

    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }
}
