<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Score extends Model
{
    use HasFactory;

    protected $primaryKey = "score_id";
    protected $table = "scores";
    protected $fillable = [
        "score",
        "score_type",
        "teacher_note",
    ];
}
