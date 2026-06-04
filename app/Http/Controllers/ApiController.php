<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\StudentService;
use App\Http\Requests\studentRequest;
use App\Http\Requests\checkboxRequest;

class ApiController extends Controller
{
    protected $StudentService;

    function __construct(StudentService $StudentService){
        $this->StudentService = $StudentService;
    }

    function store(studentRequest $request){
         $data = $this->StudentService->create(
                 $request->Name
                ,$request->Email
                ,$request->Address
                ,$request->Phone
         );

        return response()->json(["Name" => $data]);
    }

    function index(){

       $data = $this->StudentService->read();

        if(!$data){
            return response()->json([

            ],500);
        }
       return response()->json($data);
    }

    function destroy($request){
        $data = $this->StudentService->delete($request);

        return response()->json(["data" => $data]);
    }

    function show($request){
       $user = $this->StudentService->Edit($request);

        return response()->json(["user" => $user]);
    }

    function update(studentRequest $request, $id){
     $msg = $this->StudentService->Update(
            $id,
            $request->Name,
            $request->Email,
            $request->Address,
            $request->Phone
        );

        return response()->json(["Msg" => $msg]);
    }

    function checkbox(checkboxRequest $request){
        $response =  $this->StudentService->checkbox($request->check);
        return response()->json(["response" => $response]);
        
    }
}
