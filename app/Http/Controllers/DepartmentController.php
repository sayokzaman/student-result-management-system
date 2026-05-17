<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departments = Department::latest(10)->paginate(10);

        return inertia('departments/index', compact('departments'));
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
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'code' => 'required|string|max:10|unique:departments,code',
            'tag' => 'nullable|string|max:50',
            'building' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:20',
        ]);

        Department::create($validated);

        return redirect()->route('departments.index')
            ->with('success', 'Department created successfully.');
    }

    /**
     * Display the specified resource.
     */
public function show(Department $department)
{
    return inertia('departments/show', [
        // This key 'department' MUST match the prop name in Show.tsx
        'department' => $department->load('courses'), 
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
    /**
 * Show the form for editing the specified resource.
 */
public function edit(Department $department)
{
    return inertia('departments/edit', [
        'department' => $department,
    ]);
}

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, string $id)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        // Add the exception for the current ID here:
        'code' => 'required|string|max:10|unique:departments,code,' . $id,
        'tag' => 'nullable|string|max:50',
        'building' => 'nullable|string|max:100',
        'phone' => 'nullable|string|max:20',    
    ]);

    $department = Department::findOrFail($id);
    $department->update($validated);

    // Change this to redirect back so you stay on the Show page if edited from there
    return redirect()->back()->with('success', 'Department updated successfully.');
}
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $department = Department::findOrFail($id);
        $department->delete();

        return redirect()->route('departments.index')
            ->with('success', 'Department deleted successfully.');
    }
}
