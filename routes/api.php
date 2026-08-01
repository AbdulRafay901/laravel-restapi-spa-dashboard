<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request){
    return $request->user();
})->middleware('auth:sanctum');


// api.php
Route::post('registration', [AuthController::class, 'registration']);
Route::post('otpCheck', [AuthController::class, 'otpCheck']);
Route::post('login', [AuthController::class, 'login']);
Route::post('resendCode', [AuthController::class, 'resendCode']);
Route::post('forgetPassword', [AuthController::class, 'forgetPassword']);
Route::post('changePassword', [AuthController::class, 'changePassword']);

Route::middleware(['auth:sanctum', 'role:admin'])->group(function(){
     Route::apiResource('students', ApiController::class)
        ->only(['store', 'update', 'destroy', 'show']);

     Route::delete('students/Checkbox',[ApiController::class, 'checkbox']);   
});
     
Route::middleware('auth:sanctum')->group(function(){
    
Route::apiResource('students', ApiController::class)->only(['index']);

   Route::post('logout', [AuthController::class, 'logout']);

})



?>
