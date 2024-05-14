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
        return $this->belongsToMany(Discipline::class,"discipline_student_classes", "student_class_id", "discipline_id");
    }
}
