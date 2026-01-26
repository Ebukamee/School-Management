<?php

namespace App\Http\Controllers;

use App\Models\Results;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

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
            return redirect()->back()->withErrors([
                "Unauthorized" => "Only teachers can create results."
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
        if ($score >= 70)
            return 'A';
        if ($score >= 60)
            return 'B';
        if ($score >= 50)
            return 'C';
        if ($score >= 45)
            return 'D';
        if ($score >= 40)
            return 'E';
        return 'F';
    }
public function manage(Request $request)
{
    $user = auth()->user();
    $query = Results::with('student');

    // 1. ALWAYS filter by the Teacher (Security)
    if ($user->role === 'teacher') {
        $query->where('created_by', $user->id);
    }

    // 2. APPLY FILTERS (Directly from the URL/Request)
    // We use "filled" to check if value exists and is not empty
    if ($request->filled('session')) {
        $query->where('session', $request->input('session'));
    }

    if ($request->filled('term')) {
        $query->where('term', $request->input('term'));
    }

    if ($request->filled('class')) {
        $query->where('class', $request->input('class'));
    }

    // 3. GET RESULTS
    // If no filters were "filled", this returns ALL results for that teacher.
    $results = $query->latest()->get();

    return Inertia::render('results/manage', [
        'results' => $results,
        // Pass the CURRENT URL params back to React so the dropdowns stay selected
        'filters' => $request->only(['session', 'term', 'class']),
    ]);
}
    public function show(Results $results)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
   public function edit($id)
    {
        $user = auth()->user();
        
        // 1. Load the Result, the Student, AND the existing Subjects/Scores
        $result = Results::with(['student', 'subjects'])->findOrFail($id);

        // 2. SECURITY: Prevent teachers from editing others' results
        if ($user->role === 'teacher' && $result->created_by !== $user->id) {
            abort(403, 'Unauthorized action.');
        }

        // 3. Return the data to the Edit Form
        return Inertia::render('results/edit', [
            'result' => $result
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, $id)
{
    $user = auth()->user();
    $result = Results::findOrFail($id);

    // 1. SECURITY CHECK
    if ($user->role === 'teacher' && $result->created_by !== $user->id) {
        abort(403, 'Unauthorized action.');
    }

    // 2. VALIDATION (Fixed)
    // We removed 'subjects.*.id' => 'required' to allow new subjects
    $validated = $request->validate([
        'remark'                => 'nullable|string',
        'subjects'              => 'required|array',
        'subjects.*.ca_score'   => 'required|numeric|min:0|max:40',
        'subjects.*.exam_score' => 'required|numeric|min:0|max:60',
        // Optional: validate name only if it's present (for new subjects)
        'subjects.*.name'       => 'nullable|string',
    ]);

    // 3. UPDATE PARENT DETAILS
    $result->update([
        'remark' => $request->remark,
    ]);

    // 4. LOOP THROUGH SUBJECTS
    foreach ($request->subjects as $sub) {
        
        // Calculate Score & Grade
        $total = $sub['ca_score'] + $sub['exam_score'];
        $grade = $this->getGrade($total);

        // LOGIC: Check if this is an Existing Subject (Has ID) or New (No ID)
        if (isset($sub['id']) && $sub['id']) {
            
            // --- A. UPDATE EXISTING ---
            // We use the ID to find the specific row to update
            $result->subjects()
                ->where('id', $sub['id']) 
                ->update([
                    'ca_score'   => $sub['ca_score'],
                    'exam_score' => $sub['exam_score'],
                    'total'      => $total,
                    'grade'      => $grade,
                ]);

        } else {

            // --- B. CREATE NEW ---
            // No ID means it's a new row added in the frontend.
            // Note: Frontend sends 'name', DB expects 'subject_name'
            $result->subjects()->create([
                'subject_name' => $sub['name'], 
                'ca_score'     => $sub['ca_score'],
                'exam_score'   => $sub['exam_score'],
                'total'        => $total,
                'grade'        => $grade,
            ]);
        }
    }

    // 5. REDIRECT
    return to_route('results.manage')
        ->with('success', 'Result updated successfully!');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Results $results)
    {
        //
    }
}