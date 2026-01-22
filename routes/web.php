<?php

use App\Http\Controllers\ResultsController;
use App\Http\Controllers\ClassesController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

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
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
   Route::get('results', [ResultsController::class, 'index'])->name('results.index');
    Route::get('classes', [ClassesController::class, 'index'])->name('classes.index');
    Route::get('classes/create', [ClassesController::class, 'create'])->name('classes.create');
    Route::post('classes', [ClassesController::class, 'store'])->name('classes.store');
});
require __DIR__.'/settings.php';
