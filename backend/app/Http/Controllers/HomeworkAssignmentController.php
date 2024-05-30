<?php

namespace App\Http\Controllers;

use App\Models\Homework;
use App\Models\HomeworkAssigment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class HomeworkAssignmentController extends Controller
{
    public function index(Request $request, string $homeworkId)
    {
        $homework = Homework::findOrFail($homeworkId);
        $studentId = $request->query('student_id');
        $homeworkAssignmnet = $homework->assignment->where('student_id', $studentId)->first();
        $homework_data = [
            "id" => $homework->id,
            "description" => $homework->description,
            "deadline" => $homework->deadline,
            "completion_status" => $homeworkAssignmnet->completion_status,
            "response_text" => $homeworkAssignmnet->response_text,
            "file_path" => $homeworkAssignmnet->file_path,
            "done_at" => $homeworkAssignmnet->done_at,
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
}
