<?php

namespace App\Http\Controllers;

use App\Models\StudentClass;
use Illuminate\Http\Request;

class StudentClassController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentClass $studentClass)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StudentClass $studentClass)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StudentClass $studentClass)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentClass $studentClass)
    {
        //
    }

    public function getStudents(string $studentClassId)
    {
        $studentClass = StudentClass::find($studentClassId);
        $students = $studentClass->students;
        $students_data = [];
        foreach ($students as $student) {
            $student_data = [
                "id" => $student->id,
                "name" => $student->user->name,
                "surname" => $student->user->surname,
                "patronym" => $student->user->patronym,
            ];
            $students_data[] = $student_data;
        }
        return response()->json(['students' => $students_data]);
    }
}
