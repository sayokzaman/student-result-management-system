<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseTrimesterController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\TrimesterController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('trimesters', TrimesterController::class);

    Route::resource('departments', DepartmentController::class);

    Route::resource('courses', CourseController::class);

    Route::resource('course-trimesters', CourseTrimesterController::class);

    Route::resource('users', UserController::class);
});

require __DIR__.'/settings.php';
