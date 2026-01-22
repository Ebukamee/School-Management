<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassesController extends Controller
{
    /**
     * Display the Timetable.
     */
    public function index()
    {
        // 1. Get all classes, sorted by time
        $classes = SchoolClass::orderBy('start_time')->get();

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