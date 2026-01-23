<?php

namespace App\Http\Controllers;

use App\Models\Results;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResultsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Show results that belong to the currently logged-in user (Student)
        $results = Results::where('user_id', auth()->id())
                    ->with('subjects')
                    ->orderBy('term')
                    ->get();

        return Inertia::render('results/index', ['results' => $results]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('teacher/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 1. Validation
        $request->validate([
            'reg_number' => 'required|exists:users,reg_number', // Ensure student exists
            'class' => 'required',
            'term' => 'required',
            'remark' => 'nullable',
            'sess' => 'required',
            'subjects' => 'required|array',
        ]);

        // Find the Student Account using the Reg Number
        $student = User::where('reg_number', $request->reg_number)->first();
        // Guarding against unauthorized access
$teacher = auth()->user();
if ($teacher->role == 'teacher') {
    if ($teacher->form !== $student->form || $teacher->class !== $student->class) {
        throw ValidationException::withMessages([
            'reg_number' => [
                "Unauthorized: You teach {$teacher->form} {$teacher->class}, but this student is in {$student->form} {$student->class}."
            ],
        ]);
    }
} else {
    throw ValidationException::withMessages([
            'reg_number' => [
                "Unauthorized: Only teachers can create results."
            ],
        ]);
}
        //Create the main Result Record assigned to the Student
        $result = Results::create([
            'user_id' => $student->id,    
            'reg_number' => $request->reg_number,
            'class' => $request->class,
            'term' => $request->term,
            'remark' => $request->remark,
            'session' => $request->sess,
            'created_by' => auth()->id(),  
        ]);

        // 4. Loop through subjects and calculate Grade
        foreach ($request->subjects as $sub) {
            
            // Calculate total first
            $total = $sub['ca_score'] + $sub['exam_score'];

            // Calculate grade automatically
            $grade = $this->getGrade($total);

            $result->subjects()->create([
                'subject_name' => $sub['name'],
                'ca_score' => $sub['ca_score'],
                'exam_score' => $sub['exam_score'],
                'total' => $total,
                'grade' => $grade,
            ]);
        }

        return redirect()->route('results.index')->with('success', 'Result created successfully!');
    }

    // --- Helper Function to Determine Grade ---
    private function getGrade($score)
    {
        if ($score >= 70) return 'A';
        if ($score >= 60) return 'B';
        if ($score >= 50) return 'C';
        if ($score >= 45) return 'D';
        if ($score >= 40) return 'E';
        return 'F';
    }

    /**
     * Display the specified resource.
     */
    public function show(Results $results)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Results $results)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Results $results)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Results $results)
    {
        //
    }
}