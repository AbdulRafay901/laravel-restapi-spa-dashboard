<?php


namespace App\Services;

use App\Events\UserRegistered;
use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Mail\EmailVerification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;



class StudentService{

// Ye strip_tags isliye use hota he agar user front-end se koi Script
// Send kardete jese <script>alert()</script>
// To strip_tags isko simple text me convert krke save krdeta he aese alert
// Mltb ye XSS preventionse attack se bachane ke liye hota he

    
public function create($Name,$Email,$Address,$Phone){
    $insert = new Student();
    $insert->Name = strip_tags($Name);
    $insert->Email = strip_tags($Email);
    $insert->Address = strip_tags($Address);
    $insert->Phone = strip_tags($Phone);
    $insert->save();
    return $Name;
}

public function read(){
    return Student::paginate(5);
}

public function delete($id){
    
    Student::destroy($id);

    return "User" . $id ."Destroy";
}

public function Edit($id){
    $user = Student::find($id);

    return $user;
}

public function Update($id,$Name, $Email, $Address, $Phone ){
      return Student::Where("id", $id)->update([
        "Name" => strip_tags($Name),
        "Email" => strip_tags($Email),
        "Address"=> strip_tags($Address),
        "Phone" => strip_tags($Phone)
    ]);
}

public function checkbox($checkbox){
     $response = Student::destroy($checkbox);

     if($response){
        return "All Delete";
     }
      
}

public function registration($Name,$Email,$Password){

$code = rand(100000,999999);
    $Subject = "Email Verification Task Manager";
    $msg = "This is Your Code ". $code;

    $insert = User::create([
        "name" => strip_tags($Name),
        "email" => strip_tags($Email),
        "password" => Hash::make($Password),
        "verification_code" => $code,
        "verification_code_expires_at" => now()->addMinutes(10)
    ]);

    $insert->assignRole('user');

    event(new UserRegistered($insert));

    return $code;
}

function otpCheck($otp){

    return User::where('verification_code', $otp)->first();
    
}

function otpUpdate($id,$type){

    if($type == "forget-password"){

          $reset_token = Str::random(60);

          User::where('id', $id)->Update([
              "verification_code" => null,
              "verification_code_expires_at" => NULL,
              'reset_token' => $reset_token,
              'reset_token_expires_at' => now()->addMinutes(10)
          ]);

          return $reset_token;

    }
        User::where('id', $id)->Update([
           "verification_code" => null,
           "email_verified_at" => now(),
           "verification_code_expires_at" => NULL
        ]);
}

function login($Email,$Password){

    $user = User::where('email', $Email)->first();

    if(!$user){
        return ["status" => false, "message" => "user not found"];
    }
    if(!Hash::check($Password, $user->password)){
        return ["status" => false,  "message" => "Password incorrect"];
    }
    if($user->verification_code !== NULL){
        return ["status" => false,  "message" => "Please Verify Your Email"];
    }

    $token = $user->createToken("TaskManager")->plainTextToken;

    return ["status" => true, 'user' => $user, 'role' => $user->getRoleNames()[0], "token" => $token];

}

function logout($request){

    $request->user()->currentAccessToken()->delete();

    return [
        "success" => true
    ];
    
}


function resendCode($code){
     $user = User::where('verification_code', $code)->first();

     if(!$user){
        return ['status' => false, 'Message' => "User Not Found"];
     }

     $newCode = rand(100000,999999);

     $Subject = "Email Verification Task Manager";
     $msg = "This is Your Code ". $newCode; 

     $user->verification_code = $newCode;
     $user->verification_code_expires_at = now()->addMinutes(10);
     $user->save();

     $mail = Mail::to($user->email)->send(new EmailVerification($Subject, $msg));

     return ['status' => true, 'user' => $user];
}

function forgetPassword($Email){
    $user = User::where('Email', $Email)->first();

    if(!$user){
        return ['status' => false, 'msg' => 'User Not Found'];
    }
    
    $code = rand(100000,999999);
    $Subject = "Email Verification Task Manager";
    $msg = "This is Your Code ". $code;

    $user->verification_code = $code;
    $user->verification_code_expires_at = now()->addMinutes(10);
    $user->save();

    $mail = Mail::to($Email)->send(new EmailVerification($Subject,$msg));    

    return ['status' => true, 'code' => $code];
    
}

function changePassword($token, $Password){

   $user = User::where('reset_token', $token)->first();

   if(now()->isAfter($user->reset_token_expires_at)){
       return ['status' => false, 'message' => 'Code Expires'];
   }

   $user->password = Hash::make($Password);
   $user->reset_token = NULL;
   $user->reset_token_expires_at = NULL;
   $user->save();

   return ['status' => true, 'message' => 'Password Change Successfully'];

}

}

?>  