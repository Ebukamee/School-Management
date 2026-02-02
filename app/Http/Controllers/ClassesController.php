<?php

namespace App\Http\Controllers;

use App\Models\SchoolClass;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class ClassesController extends Controller
{
    /**
     * Display the Timetable (Read Only View).
     */
    public function index()
    {
        $user = auth()->user();
        
        // If teacher, show their class. If admin, show all (or handle filtering via request)
        $gradeLevel = ($user->role === 'teacher') ? $user->form . $user->class : null;

        $query = SchoolClass::orderBy('start_time');

        if ($gradeLevel) {
            $query->where('grade_level', $gradeLevel);
        }

        // Group by day for the frontend grid
        $grouped = $query->get()->groupBy('day');

        return Inertia::render('classes/index', [
            'timetable' => $grouped
        ]);
    }

    /**
     * Show the form for creating/editing.
     * NOW: Fetches existing classes so the teacher sees them while editing.
     */
    public function create()
    {
        $user = auth()->user();
        
        // 1. Identify the Target Grade Level
        // If Admin, they might need to select a class via dropdown (logic not shown here, assuming Teacher focus)
        $targetGrade = $user->form . $user->class;

        if ($user->role === 'teacher' && empty($targetGrade)) {
            return redirect()->back()->withErrors(['error' => 'You are not assigned to a specific class/form.']);
        }

        // 2. Fetch Existing Schedule for this Class
        // We get ALL classes for this grade so the frontend can draw the grid
        $existingClasses = SchoolClass::where('grade_level', $targetGrade)
            ->orderBy('start_time')
            ->get();

        return Inertia::render('classes/create', [
            // Pass the target grade so the frontend knows what we are editing
            'targetGrade' => $targetGrade,
            // Pass the existing data to show "Occupied Slots"
            'existingClasses' => $existingClasses, 
        ]);
    }

    /**
     * Store or Update the Class Schedule.
     */
    public function store(Request $request)
    {
        // 1. Validate (Removed 'room')
        $validated = $request->validate([
            'grade_level' => 'required|string',
            'classes' => 'required|array|min:1',
            'classes.*.subject' => 'required|string',
            'classes.*.day' => 'required|string',
            'classes.*.start_time' => 'required',
        ], [
            'classes.*.subject.required' => 'Subject is required for all entries.',
        ]);

        $user = auth()->user();

        // 2. Authorization
        if ($user->role !== 'admin' && $user->role !== 'teacher') {
            abort(403, 'Unauthorized action.');
        }

        if ($user->role === 'teacher' && ($user->form . $user->class !== $request->grade_level)) {
            throw ValidationException::withMessages([
                'grade_level' => ["You can only create timetables for your assigned class: {$user->form}{$user->class}."]
            ]);
        }

        // 3. Prepare Data for Upsert (Removed 'room')
        $upsertData = [];
        $timestamp = now();

        foreach ($request->classes as $cls) {
            $upsertData[] = [
                'grade_level' => $request->grade_level,
                'subject'     => $cls['subject'],
                'day'         => $cls['day'],
                'start_time'  => $cls['start_time'],
                // 'end_time'    => $cls['end_time'],
                // 'room' => removed!
                'created_at'  => $timestamp,
                'updated_at'  => $timestamp,
            ];
        }

        // 4. Run Upsert (Removed 'room' from update list)
        // If Grade+Day+Start matches, update Subject/EndTime/UpdatedAt.
        SchoolClass::upsert(
            $upsertData, 
            ['grade_level', 'day', 'start_time'], 
            ['subject', 'updated_at'] 
        );

        return redirect()->route('classes.index')
            ->with('success', 'Timetable updated successfully!');
    }
}