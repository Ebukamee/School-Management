<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
  public function stats(Request $request)
{
    // 1. Get Filters or Defaults
    // Default Start: 1st of this month
    // Default End: Today
    $startDate = $request->input('start_date', Carbon::now()->startOfMonth()->toDateString());
    $endDate = $request->input('end_date', Carbon::now()->toDateString());

    // 0. Get Subjects for dropdown
    $subjects = Attendance::distinct()->orderBy('subject')->pluck('subject');

    // 2. Base Query
    $query = Attendance::query();

    // Filter by Subject if selected
    if ($request->filled('subject')) {
        $query->where('subject', $request->subject);
    }

    // Filter by Date Range (Apply to BOTH charts)
    $query->whereBetween('date', [$startDate, $endDate]);

    // 3. KPI Summary (Pie Chart Data)
    $summaryQuery = clone $query;
    $summary = $summaryQuery->select('status', DB::raw('count(*) as total'))
        ->where('student_id', auth()->user()->id)
    ->groupBy('status')
        ->pluck('total', 'status');


    $trendQuery = clone $query;
    $dailyTrends = $trendQuery->select('date', 'status', DB::raw('count(*) as total'))
        ->where('student_id', auth()->user()->id)
    ->groupBy('date', 'status')
        ->orderBy('date')
        ->get();

    return Inertia::render('attendance/index', [
        'summary' => $summary,
        'dailyTrends' => $dailyTrends,
        'subjects' => $subjects,
        'filters' => [
            'subject' => $request->subject,
            'start_date' => $startDate,
            'end_date' => $endDate,
        ]
    ]);
}
public function manage(Request $request)
{
    // We need to list "Registers Taken". 
    // Since we don't store 'class' in the attendance table, we group by date/subject/recorded_by
    // and grab the first student to figure out the class.
    
    $registers = Attendance::query()
        ->with('student:id,form,class') // Eager load student to get class info
        ->select('date', 'subject', 'recorded_by', 'student_id', 'updated_at')
        ->where('recorded_by', auth()->user()->name)
        // This 'groupBy' ensures we only get ONE row per class-subject-day
        // Note: 'student_id' here is just to help us find the class later
        ->groupBy('date', 'subject', 'recorded_by') 
        ->orderBy('date', 'desc')
        ->paginate(10);

    // Transform data to make it easy for Frontend
    $history = $registers->through(function ($reg) {
        return [
            'date' => $reg->date->format('Y-m-d'),
            'human_date' => $reg->date->format('D, jS M Y'),
            'subject' => $reg->subject,
            'recorded_by' => $reg->recorded_by,
            'updated_at' => $reg->updated_at->diffForHumans(),
            // Get Class info from the attached student
            'form' => $reg->student->form ?? 'N/A', 
            'class' => $reg->student->class ?? 'N/A',
        ];
    });

    return Inertia::render('attendance/manage', [
        'history' => $history
    ]);
}
    public function create(Request $request)
    {
        $students = [];

        // If Teacher selected a class, fetch the students
        if ($request->has(['form', 'class'])) {
            $students = User::where('role', 'student')
                ->where('form', $request->form)
                ->where('class', $request->class) // using your separate columns
                ->orderBy('name')
                ->get(['id', 'name', 'reg_number']); // Fetch only needed fields
        }

        return Inertia::render('attendance/create', [
            'filters' => $request->only(['form', 'class', 'date']),
            'students' => $students,
        ]);
    }

    /**
     * Store bulk attendance records.
     */
  public function store(Request $request)
{
    $validated = $request->validate([
        'date' => 'required|date',
        'subject' => 'required|string',
        'attendance' => 'required|array',
        'attendance.*.student_id' => 'required|exists:users,id',
        'attendance.*.status' => 'required|string',
    ]);

    $teacherName = auth()->user()->name;
    $now = now();

    // 1. Prepare the Data for Mass Insert
    // We map the incoming array into a format the Database understands
    $dataToUpsert = [];
    
    foreach ($validated['attendance'] as $record) {
        $dataToUpsert[] = [
            'student_id'  => $record['student_id'],
            'date'        => $validated['date'],
            'subject'     => $validated['subject'],
            'status'      => $record['status'],
            'recorded_by' => $teacherName,
            'created_at'  => $now,
            'updated_at'  => $now,
        ];
    }

    // 2. Perform Mass Update (The "Upsert")
    // Argument 1: The data array
    // Argument 2: The "Unique Keys" to check for duplicates
    // Argument 3: The columns to update if a duplicate is found
    
    Attendance::upsert(
        $dataToUpsert, 
        ['student_id', 'date', 'subject', 'recorded_by'], // The Unique Constraint we added to migration
        ['status', 'recorded_by', 'updated_at'] // Columns to update
    );

    return redirect()->back()->with('success', 'Attendance Register Saved!');
}
   public function edit(Request $request)
{
    // 1. Validation
    $request->validate([
        'date' => 'required|date',
        'subject' => 'required|string',
        'form' => 'required|string',
        'class' => 'required|string',
    ]);

    // 2. CHECK IF REGISTER EXISTS (The 404 Logic)
    // We check if ANY student in this class has an attendance record 
    // for this specific date and subject.
    $exists = \App\Models\Attendance::where('date', $request->date)
        ->where('subject', $request->subject)
        ->whereHas('student', function($q) use ($request) {
            $q->where('form', $request->form)
              ->where('class', $request->class);
        })
        ->exists();

    // If no records found (e.g. user typed "Math" instead of "Mathematics"), 404.
    if (!$exists) {
        abort(404);
    }

    // 3. Get Students
    $students = User::where('role', 'student')
        ->where('form', $request->form)
        ->where('class', $request->class)
        ->orderBy('name')
        ->get(['id', 'name', 'reg_number', 'image']);

    // 4. Get Attendance Data
    $attendanceData = Attendance::where('date', $request->date)
        ->where('subject', $request->subject)
        ->whereIn('student_id', $students->pluck('id'))
        ->get();

    // 5. Merge Data
    foreach ($students as $student) {
        $record = $attendanceData->firstWhere('student_id', $student->id);
        $student->attendances = $record ? [['status' => $record->status]] : [];
    }

    return Inertia::render('attendance/edit', [
        'record_info' => $request->only(['date', 'subject', 'form', 'class']),
        'students' => $students,
    ]);
}
}

