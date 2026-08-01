<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\StudentService;
use App\Http\Requests\AuthRequest;
use App\Http\Requests\changepRequest;


class AuthController extends Controller
{
    public $StudentService;

    function __construct(StudentService $StudentService){
        $this->StudentService = $StudentService;
    }

    function registration(AuthRequest $request){
       $response = $this->StudentService->registration($request->Name, $request->Email, $request->Password);
       return response()->json([
          'status' => true,
          'data' => "Verify Your Email",
          'code' => $response
        ], 200);
    }

    function otpcheck(Request $request){

     $response = $this->StudentService->otpcheck($request->otp);

     if(!$response){
        return response()->json([
            'status' => false,
            "data" => "Incorrect Code"
            ], 400);
     }

     if(now()->isAfter($response->verification_code_expires_at)){
         return response()->json([
            "status" => false,
            "data" => "Code Expire Request New One"
        ], 400);
     }

     
        $res = $this->StudentService->otpUpdate($response->id, $request->type);

        return response()->json([
            'status' => true,
            "data" => $res
        ], 200);


    }

        function login(Request $request){
            $response = $this->StudentService->login($request->Email, $request->Password);

            if(!$response['status']){
                return response()->json([
                    'status' => false,
                    'data' => $response["message"]
                ], 400);
            }
        
            return response()->json([
                'status' => true,
                'user' => $response["user"],
                'role' => $response['role'],
                'token' =>  $response['token']
            ], 200); 
            
        }
    function logout(Request $request){
       $response = $this->StudentService->logout($request);

       if($response['success']){
          return response()->json([
             'status' => true
          ]);
       }
    }

    function resendCode(Request $request){
        $response = $this->StudentService->resendCode($request->code);

        if(!$response['status']){
            return response()->json([
                'status'=> false,
                'data' => $response['message']
            ]);
        }

        return response()->json([
            'status'=>true,
            'data' => $response['user']
        ]);
    }

    function forgetPassword(request $request){
       $response = $this->StudentService->forgetPassword($request->Email);

       if(!$response['status']){
           return response()->json([
               'status' => false,
               'data' => $response['msg']
           ], 401);
       }

       return response()->json([
          'status' => true,
          'data' => $response['code']
       ], 200);
    }

    function changePassword(changepRequest $request){
        $response = $this->StudentService->changePassword($request->token, $request->Password);

        if(!$response['status']){
            return response()->json([
                'status' => false,
                'data' => $response['message']
            ], 401);
        }

        return response()->json([
            'status' => true,
            'data' => $response['message']
        ], 200);
    }
}
