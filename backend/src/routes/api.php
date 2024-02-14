<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\StatusController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['middleware' => ['api']], function () {
    Route::prefix('v1')->group(function () {
        Route::apiResource('statuses', StatusController::class)->only('index');
        Route::apiResource('tasks', TaskController::class);
        Route::post('tasks/{task}/set-status', [TaskController::class, 'moveToStatus']);
    });
});
