<?php

use App\Http\Controllers\ResultsController;
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
Route::post('results', [ResultsController::class, 'store'])->middleware(['auth', 'verified'])->name('results.store');
Route::middleware(['auth'])->group(function () {
    Route::get('results/create', [ResultsController::class, 'create'])->name('results.create');
});
Route::middleware(['auth', 'verified'])->group(function () {
   Route::get('/dashboard', function () {
        $user = auth()->user();
        $today = date('l'); // Gets current day, e.g., "Monday"

        // Fetch classes for Today + User's Grade Level
        $todaysClasses = SchoolClass::where('day', $today)
            // Matches the user's class (e.g., SS3)
            ->orderBy('start_time')
            ->get();

        return Inertia::render('dashboard', [
            'todaysClasses' => $todaysClasses
        ]);
    })->name('dashboard');
   Route::get('results', [ResultsController::class, 'index'])->name('results.index');
    Route::get('classes', [ClassesController::class, 'index'])->name('classes.index');
    Route::get('classes/create', [ClassesController::class, 'create'])->name('classes.create');
    Route::post('classes', [ClassesController::class, 'store'])->name('classes.store');
});
require __DIR__.'/settings.php';
