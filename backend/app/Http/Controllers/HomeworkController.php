<?php

namespace App\Http\Controllers;

use App\Models\Homework;
use App\Models\TeacherDiscipline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeworkController extends Controller
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
    public function createHomework($teacherId, $disciplineId, $studentClassId, $description, $deadline)
    {
        $homework = new Homework();
        $teacherDiscipline = DB::table('teachers_disciplines')
            ->where('teacher_id', $teacherId)
            ->where('discipline_id', $disciplineId)
            ->first();
        $homework->teacher_discipline_id = $teacherDiscipline->id;
        $homework->student_class_id = $studentClassId;
        $homework->description = $description;
        $homework->deadline = $deadline;
        $homework->save();

        return $homework->id;
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
    public function show(Homework $homework)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Homework $homework)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Homework $homework)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Homework $homework)
    {
        //
    }

    public function getAssignedHomeworks(Request $request, $studentClassId)
    {
        $teacherId = $request->query('teacher_id');
        $disciplineId = $request->query('discipline_id');
        $teacherDisciplineId = TeacherDiscipline::where('teacher_id', $teacherId)->where('discipline_id', $disciplineId)->first()->id;
        if ($teacherDisciplineId) {
            $homeworks = Homework::where('teacher_discipline_id', $teacherDisciplineId)->where('student_class_id', $studentClassId)->get();
            $homeworks_data = [];
            foreach($homeworks as $homework) {
                $homework_data = [
                    'id' => $homework->id,
                    'description' => $homework->description,
                    'deadline' => $homework->deadline,
                ];
                $homeworks_data[] = $homework_data;
            }
            return response()->json(["homeworks" => $homeworks_data]);
        } else {
            return response()->json([],400);
        }
    }
}
