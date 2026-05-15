<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'phone_number' => '1000000001',
                'role' => 'admin',
            ],
            [
                'name' => 'Teacher User',
                'email' => 'teacher@example.com',
                'phone_number' => '1000000002',
                'role' => 'teacher',
            ],
            [
                'name' => 'Teacher User 2',
                'email' => 'teacher2@example.com',
                'phone_number' => '1000000003',
                'role' => 'teacher',
            ],
            [
                'name' => 'Teacher User 3',
                'email' => 'teacher3@example.com',
                'phone_number' => '1000000004',
                'role' => 'teacher',
            ],
            [
                'name' => 'Student User',
                'email' => 'student@example.com',
                'phone_number' => '1000000004',
                'role' => 'student',
            ],
        ];

        foreach ($users as $userData) {
            $role = $userData['role'];

            $user = User::updateOrCreate(
                ['email' => $userData['email']],
                [
                    'name' => $userData['name'],
                    'phone_number' => $userData['phone_number'],
                    'password' => Hash::make('password'),
                    'email_verified_at' => now(),
                ]
            );

            if (! $user->hasRole($role)) {
                $user->syncRoles([$role]);
            }
        }
    }
}
