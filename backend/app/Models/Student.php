<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Student extends Model
{
    use HasFactory;

    protected $table = "students";
    protected $primaryKey = "id";
    protected $fillable = [
        "id"
    ];

    public function parents(): BelongsToMany
    {
        return $this->belongsToMany(ParentModel::class, "parents_students", "student_id", "parent_id");
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "id");
    }

    public function studentClass(): BelongsTo
    {
        return $this->belongsTo(StudentClass::class, "student_class_id");
    }

    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class);
    }
}
