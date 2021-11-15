<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// test
// getting info from db
Route::get('test/test1', 'App\Http\Controllers\TestController@getInfoFromDB');
// getting info from testRecommender
Route::get('test/test2', 'App\Http\Controllers\TestController@getInfoFromTestRecommender');

// application routes
// login user(student or mentor)
Route::post('/user/login', 'App\Http\Controllers\GeneralController@loginUser');
// register student
Route::post('student/register', 'App\Http\Controllers\StudentController@registerStudent');
// register mentor
Route::post('mentor/register', 'App\Http\Controllers\MentorController@registerMentor');
// get student profile info
Route::get('student/{std_id}/profile', 'App\Http\Controllers\StudentController@getStudentProfileInfo');
// get mentor profile info
Route::get('mentor/{ment_id}/profile', 'App\Http\Controllers\MentorController@getMentorProfileInfo');
// get a student's recommended mentors
Route::get('student/{std_id}/mentors/recommendations', 'App\Http\Controllers\StudentController@getMentorRecomms');
// get mentors by category
Route::get('student/mentors/categories', 'App\Http\Controllers\StudentController@getMentorsByCategories');
// get a mentor recommendations(mentors similar to a particular mentor based on the description)
Route::get('student/single/mentor/{ment_id}/recommendations', 'App\Http\Controllers\StudentController@getSingleMentorRecomms');
// connect to mentors
Route::post('student/{std_id}/connect/{ment_id}', 'App\Http\Controllers\StudentController@connectToMentor');
// get all a student's requests
Route::get('student/{std_id}/requests/all', 'App\Http\Controllers\StudentController@getAllRequests');
// get single student's request
Route::get('student/connection/{conn_id}', 'App\Http\Controllers\StudentController@getSingleRequest');
// get all a mentor's requests
Route::get('mentor/{ment_id}/requests/all', 'App\Http\Controllers\MentorController@getAllRequests');