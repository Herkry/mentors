<?php
    
namespace App\Http\Controllers;

use DB;  
use App\Models\Mentor;
use Illuminate\Http\Request;
    
class GeneralController extends Controller
{
    // login for both students and mentors
    public function loginUser(Request $request){
        // validation to be done later

        // check if student or mentor
        if(request("mem_type") == "student"){
            // verification for students
            // verify if username exists
            $students = DB::table("students")->where("std_id", "=", $request->mem_id)
                                             ->get()
                                             ->toArray();

            if(count($students) > 0){
                // verify password
                $db_pass = $students[0]->std_pass;
                if (md5($request->mem_pass) == $db_pass){

                        // return success msg with other important session information
                        $responseArray = array("message"=>"success",
                                               "error"=> "none", 
                                               "mem_id"=>$students[0]->std_id, 
                                               "mem_fname"=> $students[0]->std_fname,
                                               "mem_lname"=> $students[0]->std_lname,
                                               "mem_type"=> "student"
                                         );
                        return json_encode($responseArray);
                    }
                    else{
                        // error wrong password
                        $responseArray = array("message"=>"error",
                                               "error"=> "Wrong Password"
                                         );
                        return json_encode($responseArray);
                    }
            }
            else{
                // error username does not exist
                $responseArray = array("message"=>"error",
                                       "error"=> "User does not exist" 
                                       
                                 );
                return json_encode($responseArray);
            } 
        }

        else{
            // verification for mentors
            // verify if username exists
            $mentors = DB::table("mentors")->where("ment_id", "=", $request->mem_id)
                                           ->get()
                                           ->toArray();

            if(count($mentors) > 0){
                // verify password
                $db_pass = $mentors[0]->ment_pass;
                if (md5($request->mem_pass) == $db_pass){

                        // return success msg with other important session information
                        $responseArray = array("message"=>"success",
                                               "error"=> "none", 
                                               "mem_id"=>$mentors[0]->ment_id, 
                                               "mem_fname"=> $mentors[0]->ment_fname,
                                               "mem_lname"=> $mentors[0]->ment_lname,
                                               "mem_type"=> "mentor"
                                         );
                        return json_encode($responseArray);
                    }
                    else{
                        // error wrong password
                        $responseArray = array("message"=>"error",
                                               "error"=> "Wrong Password"
                                         );
                        return json_encode($responseArray);
                    }
            }
            else{
                // error username does not exist
                $responseArray = array("message"=>"error",
                                       "error"=> "User does not exist" 
                                       
                                 );
                return json_encode($responseArray);
            }
        }

           

    }
}
