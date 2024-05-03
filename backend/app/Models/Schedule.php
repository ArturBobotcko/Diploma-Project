<?php

namespace App\Models;

use App\Casts\TimeCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $table = "schedules";
    protected $primaryKey = "id";
    protected $fillable = [
        "day_of_week",
        "start_time",
        "end_time",
    ];

    protected function casts(): array
    {
        return [
            "day_of_week" => "datetime: l",
            "start_time" => TimeCast::class,
            "end_time" => TimeCast::class,
        ];
    }
}
