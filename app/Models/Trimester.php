<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Trimester extends Model
{
    protected $fillable = [
        'type',
        'year',
        'status',
        'start_date',
        'end_date',
    ];
}
