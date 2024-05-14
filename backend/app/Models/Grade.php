<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\BelongsToManyRelationship;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Grade extends Model
{
    use HasFactory;

    protected $table = "grades";
    protected $primaryKey = "id";
    protected $fillable = [
        "discipline_id",
        "grade_value",
    ];

    public function disciplines(): BelongsToMany
    {
        return $this->belongsToMany(Discipline::class);
    }
}
