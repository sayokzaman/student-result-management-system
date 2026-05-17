<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Department;
use App\Models\User;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::with('department')->latest(10)->paginate(10);

        $departments = Department::all();

        $teachers = User::role('teacher')->get();

        return inertia('courses/index', compact('courses', 'departments', 'teachers'));
    }

    public function create()
    {
        // 
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|unique:courses,code|max:10',
            'name' => 'required|string|max:100',
            'credits' => 'required|integer|min:1|max:6',
            'description' => 'nullable|string',
            'department_id' => 'required|exists:departments,id',
            'instructor_id' => 'required|exists:users,id',
        ]);

        Course::create($validated);

        return redirect()->route('courses.index')
            ->with('success', 'Course created successfully.');
    }

    public function show(Course $course)
    {
        return inertia('courses/show', compact('course'));
    }

    public function edit(Course $course)
    {
        //
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:10|unique:courses,code,'.$course->id,
            'name' => 'required|string|max:100',
            'credits' => 'required|integer|min:1|max:6',
            'description' => 'nullable|string',
            'department_id' => 'required|exists:departments,id',
            'instructor_id' => 'required|exists:users,id',
        ]);

        $course->update($validated);

        return redirect()->route('courses.index')
            ->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        $course = Course::findOrFail($course->id);
        $course->delete();

        return redirect()->route('courses.index')
            ->with('success', 'Course deleted successfully.');
    }
}
