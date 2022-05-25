<?php

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

/**
 * autenticação
 */
Route::get('/login', 'Admin\Auth\AuthController@index')->name('login');
Route::post('/login', 'Admin\Auth\AuthController@authenticate')->name('authenticate');
Route::get('logout', 'Admin\Auth\AuthController@logout')->name('logout');

Route::middleware(['auth'])->namespace('Admin')->group(function () {
  
    /* URL */
    Route::get('/protocols', 'ProtocolController@index')->name('protocols');
    Route::get('protocol/lot/create', 'ProtocolController@createLot')->name('create.lot.protocol');
	Route::post('/protocols/lot', 'ProtocolController@saveLot')->name('save.lot.protocol');
	Route::get('/get-protocols', 'ProtocolController@getProtocols')->name('get.protocols');
});
