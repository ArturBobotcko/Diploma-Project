<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class HomeworkAssigment extends Model
{
    use HasFactory;
    protected $table = "homework_assignments";
    protected $primaryKey = "id";
    protected $fillable = [
        "homework_id",
        "student_id",
        "completion_status",
        "response_text",
        "file_path"
    ];

    public function grade(): BelongsTo
    {
        return $this->belongsTo(Grade::class);
    }
}
