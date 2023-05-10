<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ClientsController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\MaterialsController;


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

Route::get('/main', function () {
    return Inertia::render('Main');
})->middleware(['auth', 'verified'])->name('main');

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/add', [OrderController::class, 'add_index'])->name('orders.add');
    Route::post('/orders/add', [OrderController::class, 'create'])->name('orders.create');
    Route::post('/orders/{order}', [OrderController::class, 'update'])->name('orders.update');
    Route::delete('/orders/{order}', [OrderController::class, 'delete'])->name('orders.delete');


    Route::get('/clients', [ClientsController::class, 'index'])->name('clients.index');
    Route::get('/clients/add', [ClientsController::class, 'add_index'])->name('clients.add');
    Route::post('/clients/add', [ClientsController::class, 'create'])->name('clients.create');
    Route::post('/clients/{client}', [ClientsController::class, 'update'])->name('clients.update');
    Route::delete('/clients/{client}', [ClientsController::class, 'delete'])->name('clients.delete');


    Route::get('/services', [ServicesController::class, 'index'])->name('services.index');


    Route::get('/materials', [MaterialsController::class, 'index'])->name('materials.index');

});



require __DIR__.'/auth.php';
