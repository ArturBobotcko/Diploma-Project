<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
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
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        //
    }

    public function gradeStudent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required',
            'discipline_id' => 'required',
            'grade_type' => 'required',
            'grade_value' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->first()], 400);
        }

        $studentId = $request->input("student_id");
        $disciplineId = $request->input("discipline_id");
        $gradeType = $request->input("grade_type");
        $gradeValue = $request->input("grade_value");
        $comment = $request->input("comment");

        try {
            $user = User::findOrFail($studentId);

            $grade = new Grade();
            $grade->student_id = $studentId;
            $grade->discipline_id = $disciplineId;
            $grade->grade_value = $gradeValue;
            $grade->grade_type = $gradeType;
            $grade->comment = $comment;
            $grade->save();

            return response()->json(['message' => 'Grade successfully saved'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error saving grade: ' . $e->getMessage()], 500);
        }
    }

    public function getHomeworks(Request $request, string $studentId)
    {
        $student = Student::findOrFail($studentId);
        $disciplineId = $request->query('discipline');

        // Получаем задания студента с учетом фильтрации по дисциплине
        $query = $student->homeworks()->with(['assignment', 'discipline']);

        if ($disciplineId) {
            $query->where('discipline_id', $disciplineId);
        }
        $homeworks = $query->get();
        // dd($homeworks);
        // Формируем ответ
        $homeworks_data = [];
        foreach ($homeworks as $homework) {
            // dd($homework);
            $homework_assignment = $homework->assignment;
            $discipline = $homework->discipline;
            // dd($homework_assignment, $discipline);
            $homework_data = [
                'id' => $homework_assignment->id,
                'discipline' => $discipline->name,
                'description' => $homework->description,
                'deadline' => $homework->deadline,
                'completion_status' => $homework_assignment->completion_status,
            ];
            $homeworks_data[] = $homework_data;
        }

        return response()->json(["homeworks" => $homeworks_data], 200);
    }

}
