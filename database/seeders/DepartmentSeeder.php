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
                'code' => 'CS',
                'tag' => 'Engineering',
                'building' => 'Science Building',
                'phone' => '555-1234',
            ],
            [
                'name' => 'Mathematics',
                'description' => 'Courses covering algebra, calculus, statistics, and applied mathematics.',
                'code' => 'MATH',
                'tag' => 'Mathematics',
                'building' => 'Math Building',
                'phone' => '555-5678',  
            ],
            [
                'name' => 'Business Administration',
                'description' => 'Management, finance, and organizational leadership programs.',
                'code' => 'BUS',
                'tag' => 'Business',
                'building' => 'Business Building',
                'phone' => '555-9012',
            ],
            [
                'name' => 'Electrical Engineering',
                'description' => 'Study of circuits, electronics, and power systems.',
                'code' => 'EE',
                'tag' => 'Engineering',
                'building' => 'Engineering Building',
                'phone' => '555-3456',
            ],
        ];

        foreach ($departments as $department) {
            Department::updateOrCreate(
                ['name' => $department['name']],
                ['description' => $department['description']] + [
                    'code' => $department['code'],
                    'tag' => $department['tag'],
                    'building' => $department['building'],
                    'phone' => $department['phone'],
                ]
            );
        }
    }
}
