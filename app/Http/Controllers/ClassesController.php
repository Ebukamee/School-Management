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
        // 1. Validate Input
        $request->validate([
            'subject' => 'required|string|max:255',
            'grade_level' => 'required|string|max:50',
            'day' => 'required|string',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);

        // 2. Save to Database
        SchoolClass::create([
            'subject' => $request->subject,
            'grade_level' => $request->grade_level,
            'day' => $request->day,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
        ]);

        // 3. Redirect back to Timetable
        return redirect()->route('classes.index')->with('success', 'Class added successfully!');
    }
}