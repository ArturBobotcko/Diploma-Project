<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeacherDiscipline extends Model
{
    use HasFactory;

    protected $table = 'teachers_disciplines';
    protected $primaryKey = 'id';
    protected $fillable = [
        'teacher_id',
        'discipline_id',
    ];

    public function discipline(): BelongsTo
    {
        return $this->belongsTo(Discipline::class, 'discipline_id', 'id');
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class, 'teacher_id', 'id')->with('user');
    }
}
