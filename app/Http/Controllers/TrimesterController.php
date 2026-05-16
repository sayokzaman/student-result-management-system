<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Trimester;
use App\Models\User;
use Illuminate\Http\Request;

class TrimesterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $trimesters = Trimester::orderBy('created_at', 'desc')->paginate(10);

        return inertia('trimesters/index', compact('trimesters'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|max:20',
            'year' => 'required|string|max:4',
            'status' => 'required|in:upcoming,active,completed',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        Trimester::create($validated);

        return redirect()->route('trimesters.index')
            ->with('success', 'Trimester created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Eager load everything smoothly in one readable step
        $trimester = Trimester::findOrFail($id)->load([
            'trimesterCourses.course.department',
            'trimesterCourses.instructor',
        ]);

        $courses = Course::all();
        $instructors = User::whereHas('roles', function ($query) {
            $query->where('name', 'teacher');
        })->get();

        return inertia('trimesters/show', compact('trimester', 'courses', 'instructors'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
