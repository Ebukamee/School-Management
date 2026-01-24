<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class ClassesController extends Controller
{
    /**
     * Display the Timetable.
     */

    public function index()
    {
        $user = auth()->user();
        $classes = SchoolClass::orderBy('start_time')
            ->where('grade_level', $user->form . $user->class) // Filter by user's class level
            ->get();

        // 2. Group them by 'day' (e.g., 'Monday' => [...classes])
        // This makes it easy to map columns in the frontend
        $grouped = $classes->groupBy('day');

        return Inertia::render('classes/index', [
            'timetable' => $grouped
        ]);
    }

    /**
     * Show the form for creating a new class.
     */
    public function create()
    {
        return Inertia::render('classes/create');
    }

    /**
     * Store a newly created class in storage.
     */

    public function store(Request $request)
    {
        $validated = $request->validate([
            'grade_level' => 'required|string',
            'classes' => 'required|array|min:1', // Must be an array
            'classes.*.subject' => 'required|string',
            'classes.*.day' => 'required|string',
            'classes.*.start_time' => 'required',
            'classes.*.end_time' => 'required',
            'classes.*.room' => 'nullable|string',
        ], [
            'classes.*.subject.required' => 'All added periods must have a subject.',
            'classes.*.day.required' => 'Day is missing.',
        ]);


        // Authorization: Only Admins and Teachers can create timetables
        $user = auth()->user();
        if ($user->role !== 'admin' && $user->role !== 'teacher') {
            return redirect()->back()->withErrors(['unauthorized' => 'You do not have permission to perform this action.']);
        }

        // Teachers can only create for their assigned class
        if ($user->form . $user->class !== $request->grade_level) {
            throw ValidationException::withMessages([
                'reg_number' => [
                    "Unauthorized: You can only create timetables for your assigned class {$user->form} {$user->class}."
                ],
            ]);
        }

        // Save each class entry
        foreach ($request->classes as $cls) {
            SchoolClass::create([
                'grade_level' => $request->grade_level,
                'subject' => $cls['subject'],
                'day' => $cls['day'],
                'start_time' => $cls['start_time'],
                'end_time' => $cls['end_time'],
                'room' => $cls['room'] ?? null,
            ]);
        }

        return redirect()->route('classes.index')->with('success', 'Timetable saved successfully!');
    }
}