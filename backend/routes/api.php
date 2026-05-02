<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VoitureController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\LocationController;

Route::prefix('v1')->group(function () {
    // Voitures
    Route::apiResource('voitures', VoitureController::class);
    
    // Clients
    Route::apiResource('clients', ClientController::class);
    
    // Locations
    Route::get('/locations', [LocationController::class, 'index']);
    Route::post('/locations', [LocationController::class, 'store']);
    Route::get('/locations/{id}', [LocationController::class, 'show']);
    Route::put('/locations/{id}', [LocationController::class, 'update']);
});