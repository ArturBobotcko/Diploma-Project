<?php

namespace App\Http\Controllers;

use App\Models\Homework;
use App\Models\HomeworkAssigment;
use Illuminate\Http\Request;

class HomeworkAssignmentController extends Controller
{
    public function index(string $homeworkId)
    {
        $homework = Homework::findOrFail($homeworkId);
        $homeworkAssignmnet = $homework->assignment;
        $homework_data = [
            "id" => $homework->id,
            "description" => $homework->description,
            "deadline" => $homework->deadline,
            "completion_status" => $homeworkAssignmnet->completion_status,
            "response_text" => $homeworkAssignmnet->response_text,
            "file_path" => $homeworkAssignmnet->file_path,
            "updated_at" => $homeworkAssignmnet->updated_at,
        ];
        return response()->json(["homework" => $homework_data]);
    }

    public function submit(Request $request, $homeworkAssignmentId)
    {
        $request->validate([
            'response_text' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,txt,jpg,png',
        ]);

        $homeworkAssignment = HomeworkAssigment::findOrFail($homeworkAssignmentId);
        $homeworkAssignment->response_text = $request->input('response_text');

        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('homework_files');
            $homeworkAssignment->file_path = $filePath;
        }

        $homeworkAssignment->completion_status = 1;
        $homeworkAssignment->save();
        return response()->json(['message' => 'Homework completely saved']);
    }

    public function assignHomework(Request $request)
    {
        $validatedData = $request->validate([
            'teacher_id' => 'required|integer|exists:teachers,id',
            'discipline_id' => 'required|integer|exists:disciplines,id',
            'description' => 'required|string|max:255',
            'deadline' => 'required|date',
        ]);

        $homeworkController = new HomeworkController();
        $homeworkId = $homeworkController->createHomework(
            $validatedData['teacher_id'],
            $validatedData['discipline_id'],
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
