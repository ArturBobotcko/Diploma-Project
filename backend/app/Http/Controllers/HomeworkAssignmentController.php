<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use App\Models\Homework;
use App\Models\HomeworkAssigment;
use App\Models\Student;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HomeworkAssignmentController extends Controller
{
    public function index(Request $request, string $homeworkId)
    {
        $homework = Homework::findOrFail($homeworkId);
        $studentId = $request->query('student_id');
        $homeworkAssignment = $homework->assignment->where('student_id', $studentId)->first();
        $grade = $homeworkAssignment->grade !== null ? $homeworkAssignment->grade->grade_value : null;
        $teacher = $homework->teacher->teacher;
        $teacher_data = [
            'id' => $teacher->user->id,
            'name' => $teacher->user->name,
            'surname' => $teacher->user->surname,
            'patronym' => $teacher->user->patronym,
        ];
        $homework_data = [
            "id" => $homework->id,
            "description" => $homework->description,
            "deadline" => $homework->deadline,
            "completion_status" => $homeworkAssignment->completion_status,
            "response_text" => $homeworkAssignment->response_text,
            "file_path" => $homeworkAssignment->file_path,
            "done_at" => $homeworkAssignment->done_at,
            "grade" => $grade,
            "checked" => $homeworkAssignment->checked,
            "checked_at" => $homeworkAssignment->checked_at,
            "teacher" => $teacher_data,
        ];
        return response()->json(["homework" => $homework_data]);
    }

    public function submit(Request $request, $homeworkId)
    {
        $request->validate([
            'response_text' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,txt,jpg,png',
            'done_at' => 'timestamp'
        ]);

        $studentId = $request->query('student_id');
        $homeworkAssignment = HomeworkAssigment::where('homework_id', $homeworkId)->where('student_id', $studentId)->first();
        $responseTextChanged = $homeworkAssignment->response_text !== $request->input('response_text');
        $fileChanged = $request->hasFile('file');

        if ($responseTextChanged || $fileChanged) {
            $homeworkAssignment->done_at = Carbon::now('Europe/Moscow');
        }

        $homeworkAssignment->response_text = $request->input('response_text');

        if ($fileChanged) {
            $filePath = $request->file('file')->store('homework_files');
            $homeworkAssignment->file_path = $filePath;
        }

        $homeworkAssignment->completion_status = 1;
        $homeworkAssignment->save();

        return response()->json(['message' => 'Homework successfully saved']);
    }


    public function assignHomework(Request $request)
    {
        $validatedData = $request->validate([
            'teacher_id' => 'required|integer|exists:teachers,id',
            'discipline_id' => 'required|integer|exists:disciplines,id',
            'description' => 'required|string|max:255',
            'deadline' => 'required|date',
            'student_class_id' => 'required|integer|exists:student_classes,id',
        ]);

        $homeworkController = new HomeworkController();
        $homeworkId = $homeworkController->createHomework(
            $validatedData['teacher_id'],
            $validatedData['discipline_id'],
            $validatedData['student_class_id'],
            $validatedData['description'],
            $validatedData['deadline'],
        );

        foreach($request->input('students') as $studentId)
        {
            $homeworkAssignment = new HomeworkAssigment();
            $homeworkAssignment->homework_id = $homeworkId;
            $homeworkAssignment->student_id = $studentId;
            $homeworkAssignment->completion_status = 0;
            $homeworkAssignment->save();
        }

        return response()->json([],200);
    }

    public function getRelatedHomeworks($homeworkId)
    {
        $assignments = HomeworkAssigment::where('homework_id', $homeworkId)->get();
        if ($assignments) {
            $students_data = [];
            $response_data = [];
            foreach($assignments as $assignment)
            {
                $student = User::find($assignment->student_id);
                $grade = $assignment->grade !== null ? $assignment->grade->grade_value : null;
                $student_data = [
                    'id' => $student->id,
                    'name' => $student->name,
                    'surname' => $student->surname,
                    'patronym' => $student->patronym,
                    'completion_status' => $assignment->completion_status,
                ];

                $homework = Homework::find($assignment->homework_id);

                $assignment_data = [
                    'id' => $assignment->id,
                    'homework_id' => $assignment->homework_id,
                    'discipline_id' => $homework->discipline->discipline->id,
                    'description' => $homework->description,
                    'deadline' => $homework->deadline,
                    'response_text' => $assignment->response_text,
                    'file_path' => $assignment->file_path,
                    'checked' => $assignment->checked,
                    'teacher_note' => $assignment->teacher_note,
                    'grade' => $grade,
                    'checked_at' => $assignment->checked_at,
                    'done_at' => $assignment->done_at,
                ];

                $students_data = [
                    'student_data' => $student_data,
                    'assignment' => $assignment_data
                ];

                $response_data[] = $students_data;
            }

            return response()->json(["students" => $response_data]);
        } else {
            return response()->json([], 400);
        }
    }

    public function checkAssignment(Request $request, $assignmentId)
    {
        try {
            // Валидация входных данных
            $request->validate([
                'teacher_note' => 'nullable|string',
                'student_id' => 'required|integer',
                'discipline_id' => 'required|integer',
                'grade' => 'required|integer',
            ]);

            // Найти задание
            $assignment = HomeworkAssigment::findOrFail($assignmentId);

            // Обновить задание
            if ($request->has('teacher_note')) {
                $assignment->teacher_note = $request->input('teacher_note');
            }
            $assignment->checked = 1;
            $assignment->checked_at = Carbon::now('Europe/Moscow');

            // Создать оценку
            $grade = new Grade();
            $grade->student_id = $request->input('student_id');
            $grade->discipline_id = $request->input('discipline_id');
            $grade->grade_type = 'homework';
            $grade->grade_value = $request->input('grade');
            if ($request->has('teacher_note')) {
                $grade->comment = $request->input('teacher_note');
            }
            $grade->save();

            // Обновить задание с идентификатором оценки
            $assignment->grade_id = $grade->id;
            $assignment->save();

            // Возвращение успешного ответа
            return response()->json(['message' => 'Assignment checked successfully'], 200);
        } catch (\Throwable $th) {
            // Возвращение ошибки
            return response()->json(['error' => 'Error checking assignment', 'details' => $th->getMessage()], 500);
        }
    }
}
