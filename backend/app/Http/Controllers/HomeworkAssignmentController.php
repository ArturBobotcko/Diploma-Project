<?php

namespace App\Http\Controllers;

use App\Models\HomeworkAssigment;
use Illuminate\Http\Request;

class HomeworkAssignmentController extends Controller
{
    public function submit(Request $request, $id)
    {
        $request->validate([
            'response_text' => 'nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,txt,jpg,png',
        ]);

        $homeworkAssignment = HomeworkAssigment::findOrFail($id);
        $homeworkAssignment->response_text = $request->input('response_text');

        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('homework_files');
            $homeworkAssignment->file_path = $filePath;
        }

        $homeworkAssignment->completion_status = 1;
        $homeworkAssignment->save();
        return response()->json(['message' => 'Homework completely saved']);
    }
}
