<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [
            [
                'name' => 'Computer Science',
                'description' => 'Programs focused on software development, systems, and computing theory.',
            ],
            [
                'name' => 'Mathematics',
                'description' => 'Courses covering algebra, calculus, statistics, and applied mathematics.',
            ],
            [
                'name' => 'Business Administration',
                'description' => 'Management, finance, and organizational leadership programs.',
            ],
            [
                'name' => 'Electrical Engineering',
                'description' => 'Study of circuits, electronics, and power systems.',
            ],
        ];

        foreach ($departments as $department) {
            Department::updateOrCreate(
                ['name' => $department['name']],
                ['description' => $department['description']]
            );
        }
    }
}
