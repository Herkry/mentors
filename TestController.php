<?php

namespace App\Http\Controllers;

use App\Models\Test;
use Illuminate\Http\Request;
use DB;

class TestController extends Controller
{
    
    public function getInfoFromDB(Test $test)
    {
        // get some test info from the db
        $testData = DB::table("tests")->get()->toJson();
        return $testData;
    }

    public function getInfoFromTestRecommender(Test $test)
    {
        // get some test info from the test recommender
        $testData = Http::get('http://localhost:5000/test2', [
            'key1' => 'key1',
            'key2' => 'key2',
            // 'page' => 1,
        ]);
        return $testData;
    }
}
