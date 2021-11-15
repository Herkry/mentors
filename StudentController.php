<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\StudentMentorConnection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use DB;

class StudentController extends Controller
{
    // register student
    public function registerStudent(Request $request){
        // validation to be done later

        $student = new Student();
        $student->std_fname = request("std_fname");
        $student->std_lname = request("std_lname");
        $student->std_email = request("std_email");
        $student->std_phone = request("std_phone");
        $student->std_course = request("std_course");
        $student->std_category = request("std_category");
        $student->std_pass = md5(request("std_pass"));

        $student->save();
        $student_std_id = Student::orderBy("std_id", "desc")->first()->std_id;

        $responseArray = array("message"=>"success",
                               "error"=> "none", 
                               "std_id"=>$student_std_id, 
                               "std_fname"=> $student->std_fname,
                               "std_lname"=> $student->std_lname,
                               "mem_type"=> "student"
                         );
        return json_encode($responseArray);
    }

    // get student profile info
    public function getStudentProfileInfo($std_id){

        // get student info whose data we want to return
        $students = DB::table("students")->where("std_id","=","$std_id")->get()->toJson();

        return $students;
    }

    // get a student's recommended mentors
    public function getMentorRecomms($std_id){
        // get mentor recommendations from the ML model API
        $mentorRecomms = Http::get('http://localhost:5000/student/personalized/recommendations', [
            'std_id' => '$std_id',
        ]);
        
        return $mentorRecomms;
        
    }

    // get other mentors by category
    public function getMentorsByCategories(){
        // selecting mentors by category
        // Data Science
        $ds_mentors = DB::table("mentors")->where("ment_category","=","Data Science")
                                          ->get();
        // HR
        $hr_mentors = DB::table("mentors")->where("ment_category","="," HR")
                                          ->get();
        // Advocate
        $adv_mentors = DB::table("mentors")->where("ment_category","=","Advocate")                    
                                           ->get();
        // Arts
        $art_mentors = DB::table("mentors")->where("ment_category","=","Arts")
                                          ->get();
        // Web Designing
        $wd_mentors = DB::table("mentors")->where("ment_category","=","Web Designing")                    
                                          ->get();
        // Mechanical Engineer
        $me_mentors = DB::table("mentors")->where("ment_category","=","Mechanical Engineer")                    
                                          ->get();
        // Sales
        $sls_mentors = DB::table("mentors")->where("ment_category","=","Sales")
                                          ->get();
        // Health and fitness
        $hf_mentors = DB::table("mentors")->where("ment_category","=","Health and fitness")
                                          ->get();
        // Civil Engineer
        $ce_mentors = DB::table("mentors")->where("ment_category","=","Civil Engineer")                    
                                          ->get();
        // Java Developer
        $jv_mentors = DB::table("mentors")->where("ment_category","=","Java Developer")
                                          ->get();
        // Business Analyst
        $ba_mentors = DB::table("mentors")->where("ment_category","=","Business Analyst")                    
                                          ->get();
        // SAP Developer
        $sap_mentors = DB::table("mentors")->where("ment_category","=","SAP Developer")
                                          ->get();
        // Automation Testing
        $at_mentors = DB::table("mentors")->where("ment_category","=","Automation Testing")
                                          ->get();
        // Electrical Engineering
        $ee_mentors = DB::table("mentors")->where("ment_category","=","Electrical Engineering")                    
                                          ->get();
        // Operations Manager
        $om_mentors = DB::table("mentors")->where("ment_category","=","Operations Manager")
                                          ->get();
        // Python Developer
        $py_mentors = DB::table("mentors")->where("ment_category","=","Python Developer")
                                          ->get();
        // Devops Engineer
        $dvps_mentors = DB::table("mentors")->where("ment_category","=","Devops Engineer")
                                          ->get();
        // Network Security Engineer
        $nse_mentors = DB::table("mentors")->where("ment_category","=","Network Security Engineer")                    
                                           ->get();
        // PMO
        $pmo_mentors = DB::table("mentors")->where("ment_category","=","PMO")
                                          ->get();
        // Database
        $db_mentors = DB::table("mentors")->where("ment_category","=","Database")
                                          ->get();
        // Hadoop
        $hadp_mentors = DB::table("mentors")->where("ment_category","=","Hadoop")
                                           ->get();
        // ETL Developer
        $etl_mentors = DB::table("mentors")->where("ment_category","=","ETL Developer")                    
                                           ->get();
        // DotNet Developer
        $dnet_mentors = DB::table("mentors")->where("ment_category","=","DotNet Developer")
                                            ->get();
        // Blockchain
        $blc_mentors = DB::table("mentors")->where("ment_category","=","Blockchain")
                                           ->get();
        // Testing
        $ts_mentors = DB::table("mentors")->where("ment_category","=","Testing")                    
                                          ->get();
        $responseArray = array("ds" =>  $ds_mentors,
                               "hr" => $hr_mentors, 
                               "adv" => $adv_mentors, 
                               "art" => $art_mentors,
                               "wd" => $wd_mentors,
                               "me" => $me_mentors,
                               "sls" => $sls_mentors,
                               "hf" => $hf_mentors, 
                               "ce" => $ce_mentors, 
                               "jv" => $jv_mentors,
                               "ba" => $ba_mentors,
                               "sap" => $sap_mentors,
                               "at" => $at_mentors,
                               "ee" => $ee_mentors, 
                               "om" => $om_mentors, 
                               "py" => $py_mentors,
                               "dvps" => $dvps_mentors,
                               "nse" => $nse_mentors,
                               "pmo" => $pmo_mentors,
                               "db" => $db_mentors,
                               "hadp" => $hadp_mentors,
                               "dnet" => $dnet_mentors,
                               "blc" => $blc_mentors,
                               "ts" => $ts_mentors
                         );
        return json_encode($responseArray);
    }

    // get a mentor recommendations(mentors similar to a particular mentor based on the description)
    public function getSingleMentorRecomms($ment_id){
        // get mentor recommendations from the ML model API
        $mentorRecomms = Http::get('http://localhost:5000/student/single/mentor/recommendations', [
            'ment_id' => $ment_id,
        ]);
        
       return $mentorRecomms;
    }

    // connection request to mentor
    public function connectToMentor($std_id, $ment_id){
        $con = new StudentMentorConnection();
        $con->conn_status = "Pending";
        $con->std_id = request("std_id");
        $con->ment_id = request("ment_id");
        $con->save();

        // test
        $responseArray = array("message"=>"success",
                               "std_id"=> $con->std_id, 
                               "ment_id"=>$con->ment_id, 
                         );
        return json_encode($responseArray);
    }

    // hf helper function to get names of mentors in requests
    public static function getNamesOfMentorsInRequests($requests){
        $requestsF = array();

        // put these in my array
        $i = 0;
        foreach($requests as $request){
            $requestsF[$i]["conn_id"] = $request->conn_id;
            $requestsF[$i]["conn_status"] = $request->conn_status;
            $requestsF[$i]["conn_session_rating"] = $request->conn_session_rating;
            $requestsF[$i]["std_id"] = $request->std_id;
            $requestsF[$i]["ment_id"] = $request->ment_id;

            $i++;
        }

        // get mentor name
        for($z = 0; $z < count($requestsF); $z++){
            $mentors = DB::table("mentors")->where("ment_id","=",$requestsF[$z]['ment_id'])->get();

            $j = 0;
            foreach($mentors as $mentor){
                // add mentor name to my array now
                $requestsF[$j]["ment_fname"] = $mentor->ment_fname;
                $requestsF[$j]["ment_lname"] = $mentor->ment_lname;
                $requestsF[$j]["ment_category"] = $mentor->ment_category;
                
                $j++;
            }
        }

        return $requestsF;
    }

    // get all requests
    public function getAllRequests($std_id){

        $pending_requests = DB::table("student_mentor_connections")->where("conn_status","=","Pending")
                                                                   ->where("std_id","=",$std_id)
                                                                   ->get();
        $accepted_requests = DB::table("student_mentor_connections")->where("conn_status","=","Accepted")
                                                                    ->where("std_id","=",$std_id)
                                                                    ->get();
        $unsuccessful_requests = DB::table("student_mentor_connections")->where("conn_status","=","Unsuccessful")                                                              ->where("std_id","=",$std_id)
                                                                        ->get();
        // adding the names of the mentors to each request                                                              
        $pending_requests = StudentController::getNamesOfMentorsInRequests($pending_requests);
        $accepted_requests = StudentController::getNamesOfMentorsInRequests($accepted_requests);
        $unsuccessful_requests = StudentController::getNamesOfMentorsInRequests($unsuccessful_requests) ;


        $all_requests = array("pending_requests" =>  $pending_requests,
                              "accepted_requests" => $accepted_requests, 
                              "unsuccessful_requests" => $unsuccessful_requests
                        );
        return json_encode($all_requests);
    }

     // get single connection request
    public function getSingleRequest($conn_id){
      $single_request = DB::table("student_mentor_connections")->where("conn_id","=",$conn_id)
                                                               ->get();
      return $single_request;
    }

}