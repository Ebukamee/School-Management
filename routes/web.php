<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\HomeWorkController;
use App\Http\Controllers\ResultsController;
use App\Http\Controllers\RegNumberController;
use App\Models\RegNumber;
use App\Models\HomeWork;
use App\Http\Controllers\ClassesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Models\SchoolClass;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);



})->name('home');
Route::get('/register', function () {
    $nextAvailable = RegNumber::where('is_used', false)
        ->orderBy('id', 'asc')
        ->first();

    // 2. Pass it to the React Page
    return Inertia::render('auth/register', [
        'nextAvailableReg' => $nextAvailable ? $nextAvailable->reg_number : null
    ]);
})->name('register');

Route::get('/schedule', function () {
    $today = date('l');

    // Concatenate form and class exactly as you had it (e.g., "JSS1A")
    $gradeLevel = auth()->user()->form . auth()->user()->class;

    $classes = SchoolClass::where('grade_level', $gradeLevel)
        ->where('day', $today)
        ->orderBy('start_time')
        ->get();

    $homeworks = HomeWork::where('form', auth()->user()->form)
        ->where('class', auth()->user()->class)
        ->whereDate('due_date', now()) 
        ->orderBy('title', 'asc')    
        ->get();

    // Kept your requested path: 'schedule/index'
    return Inertia::render('schedule/index', [
        'classes' => $classes,
        'homework' => $homeworks
    ]);
})->name('schedule');
Route::get('/attendance/create', [App\Http\Controllers\AttendanceController::class, 'create'])->name('attendance.create');
Route::get('/attendance', [App\Http\Controllers\AttendanceController::class, 'stats'])->name('attendance.stats');
Route::post('/attendance', [App\Http\Controllers\AttendanceController::class, 'store'])->name('attendance.store');
Route::get('/attendance/manage', [AttendanceController::class, 'manage'])->name('attendance.manage');
Route::get('/attendance/edit', [AttendanceController::class, 'edit'])->name('attendance.edit');
// Route::middleware(['auth'])->group(function () {
//     Route::get('results/create', [ResultsController::class, 'create'])->name('results.create');
// });
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();
        $today = date('l');
        $gradeLevel = $user->form . $user->class;

        // Fetch classes for today for the user's class level
        $todaysClasses = SchoolClass::where('day', $today)
            ->where('grade_level', $gradeLevel)
            ->orderBy('start_time')
            ->get();

        return Inertia::render('dashboard', [
            'todaysClasses' => $todaysClasses
        ]);
    })->name('dashboard');
    Route::middleware(['auth', 'student'])->group(function () {
        Route::get('results', [ResultsController::class, 'index'])->name('results.index');
    });
    Route::get('classes', [ClassesController::class, 'index'])->name('classes.index');
});
// Route::get('/homework/{id}', [HomeWorkController::class, 'show'])->name('homework.show');
Route::get('/homework', [HomeWorkController::class, 'index'])->name('homework.index');
Route::middleware(['auth', 'teacher'])->group(function () {
    Route::get('/allowed-numbers', [RegNumberController::class, 'index'])->name('reg_numbers.index');
    Route::get('/homework/create', [HomeWorkController::class, 'create'])->name('homework.create');
    Route::post('/homework', [HomeWorkController::class, 'store'])->name('homework.store');
    Route::post('/allowed-numbers', [RegNumberController::class, 'store'])->name('reg_numbers.store');
    Route::delete('/allowed-numbers/{id}', [RegNumberController::class, 'destroy'])->name('reg_numbers.destroy');
    Route::get('/allowed-numbers/create', [RegNumberController::class, 'create'])->name('reg_numbers.create');
    Route::get('/results/manage', [ResultsController::class, 'manage'])->name('results.manage');
    Route::get('/results/{id}/edit', [ResultsController::class, 'edit'])->name('results.edit');
    Route::put('/results/{id}', [ResultsController::class, 'update'])->name('results.update');
    Route::get('classes/create', [ClassesController::class, 'create'])->name('classes.create');
    Route::post('classes', [ClassesController::class, 'store'])->name('classes.store');
    Route::get('results/create', [ResultsController::class, 'create'])->name('results.create');
    Route::post('results', [ResultsController::class, 'store'])->middleware(['auth', 'verified'])->name('results.store');
   Route::get('/homework/manage', [HomeWorkController::class, 'manage'])->name('homework.manage');
   Route::get('/homework/{id}/edit', [HomeWorkController::class, 'edit'])->name('homework.edit');
   Route::put('/homework/{id}', [HomeWorkController::class, 'update'])->name('homework.update');
    Route::get('/homework/{id}', [HomeWorkController::class, 'show'])->name('homework.show');
    Route::delete('/homework/{id}', [HomeWorkController::class, 'destroy'])->name('homework.destroy');
});


require __DIR__ . '/settings.php';
