<?php

namespace App\Http\Controllers;

use App\Models\Mentor;
use Illuminate\Http\Request;
use DB;

class MentorController extends Controller
{
    // register mentor
    public function registerMentor(Request $request){
        // validation to be done later

        $mentor = new Mentor();
        $mentor->ment_fname = request("ment_fname");
        $mentor->ment_lname = request("ment_lname");
        $mentor->ment_email = request("ment_email");
        $mentor->ment_phone = request("ment_phone");
        $mentor->ment_category = request("ment_category");
        $mentor->ment_resume_summary = request("ment_resume_summary");
        $mentor->ment_pass = md5(request("ment_pass"));

        $mentor->save();
        $ment_ment_id = Mentor::orderBy("ment_id", "desc")->first()->ment_id;

        $responseArray = array("message"=>"success",
                               "error"=>"none", 
                               "ment_id"=>$ment_ment_id, 
                               "ment_fname"=> $mentor->ment_fname,
                               "ment_lname"=> $mentor->ment_lname,
                               "mem_type"=> "mentor"
                         );
        return json_encode($responseArray);
    }

    // get mentor profile info
    public function getMentorProfileInfo($ment_id){

        // get mentor info whose data we want to return
        $mentors = DB::table("mentors")->where("ment_id","=","$ment_id")->get()->toJson();

        return $mentors;
    }

    // hf helper function to get names of students in requests
    public static function getNamesOfStudentsInRequests($requests){
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
            $students = DB::table("students")->where("std_id","=",$requestsF[$z]['std_id'])->get();

            $j = 0;
            foreach($students as $student){
                // add mentor name to my array now
                $requestsF[$j]["std_fname"] = $student->ment_fname;
                $requestsF[$j]["std_lname"] = $student->ment_lname;
                
                $j++;
            }
        }

        return $requestsF;
    }

    // get all requests
    public function getAllRequests($ment_id){

        $pending_requests = DB::table("student_mentor_connections")->where("conn_status","=","Pending")
                                                                   ->where("ment_id","=",$ment_id)
                                                                   ->get();
        $accepted_requests = DB::table("student_mentor_connections")->where("conn_status","=","Accepted")
                                                                    ->where("ment_id","=",$ment_id)
                                                                    ->get();
        $unsuccessful_requests = DB::table("student_mentor_connections")->where("conn_status","=","Unsuccessful")                                                            ->where("ment_id","=",$ment_id)
                                                                        ->get();
        // adding the names of the mentors to each request                                                              
        $pending_requests = StudentController::getNamesOfStudentsInRequests($pending_requests);
        $accepted_requests = StudentController::getNamesOfStudentsInRequests($accepted_requests);
        $unsuccessful_requests = StudentController::getNamesOfStudentsInRequests($unsuccessful_requests) ;


        $all_requests = array("pending_requests" =>  $pending_requests,
                              "accepted_requests" => $accepted_requests, 
                              "unsuccessful_requests" => $unsuccessful_requests
                        );
        return json_encode($all_requests);
    }
}