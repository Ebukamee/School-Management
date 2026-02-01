<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\HomeWorkController;
use App\Http\Controllers\ResultsController;
use App\Http\Controllers\RegNumberController;
use App\Models\Blog;
use App\Models\RegNumber;
use App\Models\HomeWork;
use App\Http\Controllers\ClassesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Models\SchoolClass;
use Illuminate\Support\Str;


// Home Route
Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'posts' => Blog::where('is_published', true)
            ->latest()
            ->take(6) // Limit to 6 for the home page
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'excerpt' => Str::limit(strip_tags($post->content), 150),
                    'author' => $post->user ? $post->user->name : 'Staff',
                    'date' => $post->created_at->format('M d, Y'),
                    'image' => $post->cover_image ? "/storage/{$post->cover_image}" : "/images/default.jpg",
                    'readTime' => '5 min',
                ];
            }),
    ]);
})->name('home');


// Static pages routes
Route::get('/academics', function () {
    return Inertia::render('academics');
})->name('academics');
Route::get('/admissions', function () {
    return Inertia::render('admissions');
})->name('admissions');
Route::get('contact', function () {
    return Inertia::render('contact');
})->name('contact');
Route::get('/student-life', function () {
    return Inertia::render('school_life');
})->name('student-life');

// Registration route with next available reg number
Route::get('/register', function () {
    $nextAvailable = RegNumber::where('is_used', false)
        ->orderBy('id', 'asc')
        ->first();
    return Inertia::render('auth/register', [
        'nextAvailableReg' => $nextAvailable ? $nextAvailable->reg_number : null
    ]);
})->name('register');

// General Auth middleware guarded routes
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
        $info = Blog::get();

        return Inertia::render('dashboard', [
            'todaysClasses' => $todaysClasses,
            'blogs' => $info
        ]);
    })->name('dashboard');
});

// Role-based routes

// Teacher Specific Routes

Route::middleware(['auth', 'teacher'])->group(function () {

    Route::get('/attendance/create', [App\Http\Controllers\AttendanceController::class, 'create'])->name('attendance.create');
    Route::post('/attendance', [App\Http\Controllers\AttendanceController::class, 'store'])->name('attendance.store');
    Route::get('/attendance/manage', [AttendanceController::class, 'manage'])->name('attendance.manage');
    Route::get('/attendance/edit', [AttendanceController::class, 'edit'])->name('attendance.edit');
    Route::get('/results/{id}/edit', [ResultsController::class, 'edit'])->name('results.edit');
    Route::put('/results/{id}', [ResultsController::class, 'update'])->name('results.update');
    Route::get('classes/create', [ClassesController::class, 'create'])->name('classes.create');
    Route::post('classes', [ClassesController::class, 'store'])->name('classes.store');
    Route::get('results/create', [ResultsController::class, 'create'])->name('results.create');
    Route::get('/results/manage', [ResultsController::class, 'manage'])->name('results.manage');
    Route::post('results', [ResultsController::class, 'store'])->middleware(['auth', 'verified'])->name('results.store');
    Route::get('/homework/manage', [HomeWorkController::class, 'manage'])->name('homework.manage');
    Route::get('/homework/create', [HomeWorkController::class, 'create'])->name('homework.create');
    Route::post('/homework', [HomeWorkController::class, 'store'])->name('homework.store');
    Route::get('/homework/{id}/edit', [HomeWorkController::class, 'edit'])->name('homework.edit');
    Route::put('/homework/{id}', [HomeWorkController::class, 'update'])->name('homework.update');
    Route::delete('/homework/{id}', [HomeWorkController::class, 'destroy'])->name('homework.destroy');

});

// Student Specific Routes
Route::middleware(['auth', 'student'])->group(function () {
    Route::get('/attendance', [App\Http\Controllers\AttendanceController::class, 'stats'])->name('attendance.stats');
    Route::get('results', [ResultsController::class, 'index'])->name('results.index');
    Route::get('/homework', [HomeWorkController::class, 'index'])->name('homework.index');
    Route::get('/homework/{id}', [HomeWorkController::class, 'show'])->name('homework.show');

});


// Teacher or Student Routes
Route::middleware(['auth', 'teacher_student'])->group(function () {
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
Route::get('classes', [ClassesController::class, 'index'])->name('classes.index');

});


// Admin Specific Routes
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/blog/create', [BlogController::class, 'create'])->name('blog.create');
    Route::post('/blog', [BlogController::class, 'store'])->name('blog.store');
    Route::get('/blog/drafts', [BlogController::class, 'drafts'])->name('blog.drafts');
    Route::get('/blog/manage', [BlogController::class, 'manage'])->name('blog.manage');
    Route::delete('/blog/{slug}', [BlogController::class, 'destroy'])->name('blog.destroy');

    Route::get('/blog/{slug}/edit', [BlogController::class, 'edit'])->name('blog.edit');

    Route::put('/blog/{slug}', [BlogController::class, 'update'])->name('blog.update');
    Route::put('/allowed-numbers/{reg_number}', [RegNumberController::class, 'update'])
        ->name('reg_numbers.update');
    Route::get('/allowed-numbers', [RegNumberController::class, 'index'])->name('reg_numbers.index');
    Route::post('/allowed-numbers', [RegNumberController::class, 'store'])->name('reg_numbers.store');
    Route::delete('/allowed-numbers/{id}', [RegNumberController::class, 'destroy'])->name('reg_numbers.destroy');
    Route::get('/allowed-numbers/create', [RegNumberController::class, 'create'])->name('reg_numbers.create');
    Route::get('/results/manage', [ResultsController::class, 'manage'])->name('results.manage');


});

// Blog public routes
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');





require __DIR__ . '/settings.php';
