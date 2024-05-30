<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Teacher extends Model
{
    use HasFactory;

    protected $table = "teachers";
    protected $primaryKey = "id";
    protected $fillable = [
        "id"
    ];

    public function disciplines(): BelongsToMany
    {
        return $this->belongsToMany(Discipline::class,"teachers_disciplines","teacher_id","discipline_id");
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id');
    }
}
