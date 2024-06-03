<?php

namespace App\Models;

use App\Casts\TimeCast;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    // public function getDayOfWeekAttribute($value)
    // {
    //     $dayOfWeek = Carbon::parse($value)->locale('ru')->translatedFormat('l');
    //     return mb_convert_case($dayOfWeek, MB_CASE_TITLE, "UTF-8");
    // }
}
