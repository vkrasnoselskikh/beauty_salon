<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\MaterialController;


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/main', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('main');

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/add', [OrderController::class, 'add_index'])->name('orders.add');
    Route::post('/orders/add', [OrderController::class, 'create'])->name('orders.create');
    Route::post('/orders/{order}', [OrderController::class, 'update'])->name('orders.update');
    Route::delete('/orders/{order}', [OrderController::class, 'delete'])->name('orders.delete');
    Route::post('/orders/{order}/status/{status}', [OrderController::class, 'set_status'])->name('orders.set_status');


    Route::get('/clients', [ClientsController::class, 'index'])->name('clients.index');
    Route::get('/clients/add', [ClientsController::class, 'add_index'])->name('clients.add');
    Route::post('/clients/add', [ClientsController::class, 'create'])->name('clients.create');
    Route::post('/clients/{client}', [ClientsController::class, 'update'])->name('clients.update');
    Route::delete('/clients/{client}', [ClientsController::class, 'delete'])->name('clients.delete');


    Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
    Route::get('/services/add', [ServiceController::class, 'add_index'])->name('services.add');
    Route::get('/services/{service}', [ServiceController::class, 'edit_index'])->name('services.edit');
    Route::post('/services/add', [ServiceController::class, 'create'])->name('services.create');
    Route::post('/services/{service}', [ServiceController::class, 'update'])->name('services.update');
    Route::delete('/services/{service}', [ServiceController::class, 'delete'])->name('services.delete');

    Route::get('/materials', [MaterialController::class, 'index'])->name('materials.index');
    Route::get('/materials/add', [MaterialController::class, 'add_index'])->name('materials.add');
    Route::post('/materials/add', [MaterialController::class, 'create'])->name('materials.create');
    Route::post('/materials/{material}', [MaterialController::class, 'update'])->name('materials.update');
    Route::delete('/materials/{material}', [MaterialController::class, 'delete'])->name('materials.delete');
});



require __DIR__.'/auth.php';
