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
        $results = Results::where('user_id', auth()->user()->id)->with('subjects')->orderBy('term')->get();

        return Inertia::render('/results', ['results' => $results]);
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
        $request->validate([
            'reg_number' => 'required|string',
            'class' => 'required|string',
            'term' => 'required|string',
            'subjects' => 'required|array',
            'remark' => 'required|string',
            'sess' => 'required|string',
        ]);
        // $student = User::where('reg_number', $request->reg_number)->firstOrFail();
        $result = Results::create([
            'user_id' => '34565786970jbf',
            'term' => $request->term,
            'class' => $request->class,
            'remark' => $request->remark,
            'session' => $request->sess,
            'reg_number' => $request->reg_number,
            'created_by' => '435465768796543'
        ]);

        foreach ($request->subjects as $sub) {
            $result->subjects()->create([
                'subject_name' => $sub['name'],
                'ca_score' => $sub['ca_score'],
                'exam_score' => $sub['exam_score'],
                'total' => $sub['ca_score'] + $sub['exam_score'],
                'grade' => $sub['grade'],
            ]);
        }

        return redirect()->route('results.index')->with('success', 'Result created!');
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
