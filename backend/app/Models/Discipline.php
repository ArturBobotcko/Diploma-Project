<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Discipline extends Model
{
    use HasFactory;

    protected $table = "disciplines";
    protected $primaryKey = "id";
    protected $fillable = [
        "discipline_name",
    ];

    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class);
    }
}
