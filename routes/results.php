<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ResultsController

Route::get('/results', [ResultsController::class, "index"]) ->name('hospital.index');





?>