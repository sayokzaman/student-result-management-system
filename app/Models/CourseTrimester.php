<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class CourseTrimester extends Pivot
{
    use HasFactory;

    protected $table = 'course_trimester';

    protected $fillable = [
        'course_id',
        'trimester_id',
        'capacity',
        'instructor_id',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function trimester()
    {
        return $this->belongsTo(Trimester::class);
    }

    public function instructor()
    {
        return $this->belongsTo(User::class, 'instructor_id');
    }
}
