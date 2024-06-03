<?php

namespace App\Http\Controllers;

use App\Models\TeacherDiscipline;
use Illuminate\Http\Request;
use App\Models\Student;

class ScheduleController extends Controller
{
    public function getStudentSchedule($studentId)
    {
        $student = Student::findOrFail($studentId);
        $classId = $student->studentClass->id;
        $teacherDisciplines = TeacherDiscipline::whereHas('schedules', function($query) use ($classId) {
            $query->where('student_class_id', $classId);
        })->with(['schedules' => function($query) use ($classId) {
            $query->where('student_class_id', $classId);
        }])->get();

        $schedules_data = [];

        foreach ($teacherDisciplines as $teacherDiscipline) {
            $schedules = [];

            foreach ($teacherDiscipline->schedules as $disciplineSchedule) {
                $schedules[] = [
                    'id' => $disciplineSchedule->id,
                    'day_of_week' => $disciplineSchedule->day_of_week,
                    'start_time' => $disciplineSchedule->start_time,
                    'end_time' => $disciplineSchedule->end_time,
                ];
            }

            $schedule_data = [
                'teacher_discipline_id' => $teacherDiscipline->id,
                'teacher' => $teacherDiscipline->teacher,
                'discipline' => $teacherDiscipline->discipline->name,
                'schedules' => $schedules,
            ];

            $schedules_data[] = $schedule_data;
        }

        return response()->json(["schedule" => $schedules_data]);
    }

}
