<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Department;
use App\Models\User;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teacher = User::role('teacher')->first();

        $courses = [
            [
                'code' => 'CS101',
                'name' => 'Introduction to Computer Science',
                'credits' => 4,
                'description' => 'Fundamental concepts of computer science and programming.',
                'department' => 'Computer Science',
                'capacity' => 50,
            ],
            [
                'code' => 'CS201',
                'name' => 'Data Structures',
                'credits' => 4,
                'description' => 'Study of common data structures and their applications.',
                'department' => 'Computer Science',
                'capacity' => 45,
            ],
            [
                'code' => 'MATH110',
                'name' => 'Calculus I',
                'credits' => 3,
                'description' => 'Differential and integral calculus for beginners.',
                'department' => 'Mathematics',
                'capacity' => 60,
            ],
            [
                'code' => 'BUS150',
                'name' => 'Principles of Management',
                'credits' => 3,
                'description' => 'Introduction to management theory and practice.',
                'department' => 'Business Administration',
                'capacity' => 40,
            ],
        ];

        foreach ($courses as $course) {
            $department = Department::all()->firstWhere('name', $course['department']);

            if (! $department) {
                continue;
            }

            Course::updateOrCreate(
                ['code' => $course['code']],
                [
                    'name' => $course['name'],
                    'credits' => $course['credits'],
                    'description' => $course['description'],
                    'department_id' => $department->id,
                    'instructor_id' => $teacher?->id,
                    'capacity' => $course['capacity'],
                ]
            );
        }
    }
}
