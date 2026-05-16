<?php

namespace App\Http\Controllers;

use App\Models\CourseTrimester;
use Illuminate\Http\Request;

class CourseTrimesterController extends Controller
{
    public function index()
    {
        //
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'trimester_id' => 'required|exists:trimesters,id',
            'capacity' => 'nullable|integer',
            'instructor_id' => 'nullable|exists:users,id',
        ]);

        $pivot = CourseTrimester::create($data);

        return response()->json($pivot, 201);
    }

    public function show(CourseTrimester $courseTrimester)
    {
        //
    }

    public function update(Request $request, CourseTrimester $courseTrimester)
    {
        $data = $request->validate([
            'course_id' => 'sometimes|exists:courses,id',
            'trimester_id' => 'sometimes|exists:trimesters,id',
            'capacity' => 'nullable|integer',
            'instructor_id' => 'nullable|exists:users,id',
        ]);

        $courseTrimester->update($data);

        return response()->json($courseTrimester);
    }

    public function destroy(CourseTrimester $courseTrimester)
    {
        $courseTrimester = CourseTrimester::findOrFail($courseTrimester->id);
        $courseTrimester->delete();

        return redirect()->route('courses.index')->with('success', 'Course-Trimester association deleted successfully.');
    }
}
