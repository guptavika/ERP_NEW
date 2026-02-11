<?php

use App\Http\Controllers\AdminInboxController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LedgerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// routes/web.php
Route::middleware(['auth'])->group(function () {
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::put('/tasks/{task}', [TaskController::class, 'update']);
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);
});
// routes/web.php
Route::middleware(['auth'])->group(function () {
    Route::get('/admin/inbox', [AdminInboxController::class, 'index']);
    Route::post('/admin/inbox/read/{id}', [AdminInboxController::class, 'markRead']);
    Route::delete('/admin/inbox/{id}', [AdminInboxController::class, 'delete']);
});

Route::middleware(['auth'])->group(function () {

    // Full CRUD routes
    Route::resource('companies', CompanyController::class,);

});
// routes/web.php
Route::get('/dashboard/{companyId}', [DashboardController::class,'index']);


Route::get('/companies/{id}/ledgers', [LedgerController::class,'index']);
Route::post('/ledgers', [LedgerController::class,'store']);
Route::put('/ledgers/{ledger}', [LedgerController::class,'update']);
Route::delete('/ledgers/{ledger}', [LedgerController::class,'destroy']);



require __DIR__.'/auth.php';
