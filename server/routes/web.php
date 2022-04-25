<?php

use Illuminate\Support\Facades\Route;

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
    return view('welcome');
});

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('register', function () {
        return view('dashboard');
    })->name('dashboard');

    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    Route::get('/partners','App\Http\Controllers\PartnersController@index')->name('partners');
    Route::get('/partners_create','App\Http\Controllers\PartnersController@create')->name('partners_create');
    Route::get('/partners_edit/{id}','App\Http\Controllers\PartnersController@edit')->name('partners_edit');
    Route::post('/partners_store','App\Http\Controllers\PartnersController@store')->name('partners_store');
    Route::post('/partners_update/{id}','App\Http\Controllers\PartnersController@update')->name('partners_update');
    Route::get('/partners_delete/{id}','App\Http\Controllers\PartnersController@destroy')->name('partners_delete');
    Route::get('/partners_delete_image/{id}','App\Http\Controllers\PartnersController@deleteImage')->name('partners_delete_image');

    Route::get('/events','App\Http\Controllers\EventsController@index')->name('events');
    Route::get('/events_create','App\Http\Controllers\EventsController@create')->name('events_create');
    Route::get('/events_edit/{id}','App\Http\Controllers\EventsController@edit')->name('events_edit');

    Route::post('/events_store','App\Http\Controllers\EventsController@store')->name('events_store');
    Route::post('/events_update/{id}','App\Http\Controllers\EventsController@update')->name('events_update');
    Route::get('/events_delete/{id}','App\Http\Controllers\EventsController@destroy')->name('events_delete');
    Route::get('/events_delete_image/{id}/{field}','App\Http\Controllers\EventsController@deleteImage')->name('events_delete_image');
});

// If on a share hosting environment the symlink is not available: use image routing
if(env('IMAGE_ROUTING')) {
    Route::get('storage/images/{filename}', function ($filename)
    {

        $path = storage_path('app/public/images/' . $filename);

        if (!File::exists($path)) {
            abort(404);
        }

        $file = File::get($path);
        $type = File::mimeType($path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);
        $response->header("Cache-Control", 'max-age=2592000');

        return $response;
    });
}
