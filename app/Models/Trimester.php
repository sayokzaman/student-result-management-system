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

    protected $appends = [
        'name',
    ];

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_trimester')
            ->using(CourseTrimester::class)
            ->withPivot('capacity', 'instructor_id')
            ->withTimestamps();
    }

    public function trimesterCourses()
    {
        return $this->hasMany(CourseTrimester::class, 'trimester_id');
    }

    public function getNameAttribute()
    {
        return "{$this->type} {$this->year}";
    }
}
