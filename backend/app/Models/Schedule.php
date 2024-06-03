<?php

namespace App\Models;

use App\Casts\TimeCast;
use App\Models\StudentClass;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Schedule extends Model
{
    use HasFactory;

    protected $table = "schedules";
    protected $primaryKey = "id";
    protected $fillable = [
        "teacher_discipline_id",
        "day_of_week",
        "start_time",
        "end_time",
    ];

    protected function casts(): array
    {
        return [
            // "day_of_week" => "datetime: l"
        ];
    }

    public function studentClass(): BelongsTo
    {
        return $this->belongsTo(StudentClass::class);
    }
}
