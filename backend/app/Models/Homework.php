<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Homework extends Model
{
    use HasFactory;

    protected $table = "homeworks";
    protected $primaryKey = "id";
    protected $fillable = [
        "discipline_id",
        "desription",
        "deadline"
    ];

    public function assigment(): HasOne
    {
        return $this->hasOne(HomeworkAssigment::class);
    }

    public function discipline(): HasOne
    {
        return $this->hasOne(Discipline::class, "id");
    }
}
