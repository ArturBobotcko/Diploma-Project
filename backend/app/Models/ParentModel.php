<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ParentModel extends Model
{
    use HasFactory;

    protected $table = "parents";
    protected $primaryKey = "id";
    protected $fillable = [
        "id"
    ];

    public function children(): BelongsToMany
    {
        return $this->belongsToMany(Student::class,"parents_students","parent_id","student_id");
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "id");
    }
}
