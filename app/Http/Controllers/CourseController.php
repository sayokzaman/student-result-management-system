<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::latest(10)->paginate(10);
        return inertia('courses/index', compact('courses'));
    }

    public function create()
    {
        return inertia('courses/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|unique:courses,code|max:10',
            'name' => 'required|string|max:100',
            'credits' => 'required|integer|min:1|max:6',
            'description' => 'nullable|string',
        ]);

        Course::create($validated);

        return redirect()->route('courses.index')
            ->with('success', 'Course created successfully.');
    }

    public function show(Course $course)
    {
        return inertia('courses.show', compact('course'));
    }

    public function edit(Course $course)
    {
        return inertia('courses/edit', compact('course'));
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:10|unique:courses,code,' . $course->id,
            'name' => 'required|string|max:100',
            'credits' => 'required|integer|min:1|max:6',
            'description' => 'nullable|string',
        ]);

        $course->update($validated);

        return redirect()->route('courses.index')
            ->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        $course =Course::findOrFail($course->id);
        $course->delete();  

        return redirect()->route('courses.index')
            ->with('success', 'Course deleted successfully.');
    }
}