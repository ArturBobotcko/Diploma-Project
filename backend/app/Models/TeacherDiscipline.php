<?php

namespace App\Models;

use App\Models\Schedule;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    public function schedules(): HasMany
    {
        return $this->hasMany(Schedule::class);
    }
}
