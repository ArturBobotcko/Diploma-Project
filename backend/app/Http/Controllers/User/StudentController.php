<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use App\Models\Homework;
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
        // Получаем студента или возвращаем 404 ошибку
        $student = Student::findOrFail($studentId);
        $studentClassId = $student->studentClass->id;

        // Получаем значение teacher_discipline_id из запроса
        $teacherDisciplineId = $request->query('teacher_discipline');

        // Формируем запрос на получение домашних заданий по student_class_id и teacher_discipline_id
        $homeworks = Homework::where('student_class_id', $studentClassId)
            ->where('teacher_discipline_id', $teacherDisciplineId)
            ->get();

        // Формируем ответ
        $homeworks_data = [];
        foreach ($homeworks as $homework) {
            // Получаем назначения домашнего задания для данного студента
            $homework_assignments = $homework->assignment->where('student_id', $studentId);

            foreach ($homework_assignments as $homework_assignment) {
                $teacher_discipline = $homework->discipline;
                $discipline = $teacher_discipline ? $teacher_discipline->discipline : null;
                $grade = $homework_assignment->grade !== null ? $homework_assignment->grade->grade_value : null;
                // Проверяем наличие дисциплины
                if ($discipline) {
                    $homework_data = [
                        'id' => $homework->id,
                        'discipline' => $discipline->name,
                        'description' => $homework->description,
                        'deadline' => $homework->deadline,
                        'completion_status' => $homework_assignment->completion_status,
                        'teacher_note' => $homework_assignment->teacher_note,
                        'checked' => $homework_assignment->checked,
                        'grade' => $grade,
                        'checked_at' => $homework_assignment->checked_at,
                    ];
                    $homeworks_data[] = $homework_data;
                }
            }
        }

        // Возвращаем JSON ответ с данными домашних заданий
        return response()->json(["homeworks" => $homeworks_data], 200);
    }
}
