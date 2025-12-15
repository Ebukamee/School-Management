<?php

use App\Http\Controllers\ResultsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');
Route::post('results', [ResultsController::class, 'store'])->name('results.store');
Route::middleware(['auth'])->group(function () {
    Route::get('results/create', [ResultsController::class, 'create'])->name('results.create');
});m
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('results', function () {
        return Inertia::render('results/index');
    })->name('results');
      Route::get('/classes', function () {
        return Inertia::render('classes/index');
    })->name('classes');
});
require __DIR__.'/settings.php';
