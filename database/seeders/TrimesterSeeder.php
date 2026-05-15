<?php

namespace Database\Seeders;

use App\Models\Trimester;
use Illuminate\Database\Seeder;

class TrimesterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // make some trimesters
        $trimesters = [
            [
                'type' => 'Spring',
                'year' => '2024',
                'status' => 'upcoming',
                'start_date' => '2024-01-01',
                'end_date' => '2024-03-31',
            ],
            [
                'type' => 'Summer',
                'year' => '2024',
                'status' => 'upcoming',
                'start_date' => '2024-04-01',
                'end_date' => '2024-06-30',
            ],
            [
                'type' => 'Fall',
                'year' => '2024',
                'status' => 'upcoming',
                'start_date' => '2024-07-01',
                'end_date' => '2024-09-30',
            ],
        ];

        foreach ($trimesters as $trimester) {
            Trimester::create($trimester);
        }
    }
}
