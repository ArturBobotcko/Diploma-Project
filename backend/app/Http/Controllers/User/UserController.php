<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Discipline;
use App\Models\ParentModel;
use App\Models\SocialLink;
use App\Models\Student;
use App\Models\StudentClass;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
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
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }

    public function getUserById(string $id)
    {
        $user = User::find($id);
        if ($user === null) {
            return response()->json(["message"=> "Unknown user"],404);
        }
        $user_data = [
            'id' => $user->id,
            'surname' => $user->surname,
            'name' => $user->name,
            'patronym' => $user->patronym,
            'email' => $user->email,
            'birth_date' => $user->birth_date,
            'phone_number' => $user->phone_number,
            'avatar' => $user->avatar,
        ];

        $role_data = [
            'id' => $user->role->id,
            'name' => $user->role->name,
        ];

        $social_links_data = [
            'vk' => $user->socialLinks->vk,
            'tg' => $user->socialLinks->tg,
            'ok' => $user->socialLinks->ok,
            'viber' => $user->socialLinks->viber,
        ];

        $parents_data = [];
        $response_data = [];
        $disciplines_data = [];
        if ($user->role->name === "student") {
            $parents = $user->student->parents()->get();
            foreach ($parents as $parent) {
                $parent_data = [
                    'id' => $parent->user->id,
                    'surname' => $parent->user->surname,
                    'name' => $parent->user->name,
                    'patronym' => $parent->user->patronym,
                    'email' => $parent->user->email,
                    'birth_date' => $parent->user->birth_date,
                    'phone_number' => $parent->user->phone_number,
                    'avatar' => $parent->user->avatar,
                ];

                $parents_data[] = $parent_data;
            }
            $student_class = $user->student->studentClass;
            $student_class_data = [];
            if ($student_class !== null) {
                $student_class_data = [
                    'number' => $student_class->number,
                    'letter' => $student_class->letter,
                ];
                $disciplines = $student_class->disciplines;
                foreach ($disciplines as $discipline) {
                    $grades_data = [];

                    foreach ($user->student->grades()->where('discipline_id', $discipline->id)->get() as $grade) {
                        $grade_data = [
                            "grade_type" => $grade->grade_type,
                            "grade_value" => $grade->grade_value,
                            "comment" => $grade->comment,
                        ];
                        $grades_data[] = $grade_data;
                    }

                    $discipline_data = [
                        'id' => $discipline->id,
                        'name' => $discipline->name,
                    ];

                    $discipline_grade_data = [
                        "discipline" => $discipline_data,
                        "grades" => $grades_data,
                    ];

                    $disciplines_data[] = $discipline_grade_data;
                }
            }

            $response_data = [
                'user' => [
                    'user_data' => $user_data,
                    'role' => $role_data,
                    'social_links' => $social_links_data,
                    'parents' => $parents_data,
                    'disciplines' => $disciplines_data,
                    'student_class' => $student_class_data,
                ]
            ];
        }

        $children_data = [];
        if ($user->role->name === "parent") {
            $children = $user->parent->children()->get();
            foreach ($children as $child) {
                $student_class = $child->studentClass;
                if ($student_class !== null) {
                    $disciplines = $student_class->disciplines;
                    $student_class_data = [
                        "number" => $student_class->number,
                        "letter" => $student_class->letter,
                    ];
                }
                $disciplines_data = [];
                foreach ($disciplines as $discipline) {
                    $grades_data = [];
                    foreach ($child->grades()->where('discipline_id', $discipline->id)->get() as $grade) {
                        $grade_data = [
                            "grade_value" => $grade->grade_value,
                            "grade_type" => $grade->grade_type,
                            "comment" => $grade->comment,
                        ];
                        $grades_data[] = $grade_data;
                    }

                    $discipline_data = [
                        'id' => $discipline->id,
                        'name' => $discipline->name,
                    ];

                    $discipline_grade_data = [
                        "discipline" => $discipline_data,
                        "grades" => $grades_data,
                    ];

                    $disciplines_data[] = $discipline_grade_data;
                }

                $child_data = [
                    "id"=> $child->user->id,
                    "surname" => $child->user->surname,
                    "name" => $child->user->name,
                    "patronym"=> $child->user->patronym,
                    "email"=> $child->user->email,
                    "birth_date"=> $child->user->birth_date,
                    "phone_number"=> $child->user->phone_number,
                    "avatar"=> $child->user->avatar,
                    "student_class" => $student_class_data,
                    "disciplines" => $disciplines_data,
                ];

                $children_data[] = $child_data;
                $response_data = [
                    'user' => [
                        'user_data' => $user_data,
                        'role' => $role_data,
                        'social_links' => $social_links_data,
                        'children' => $children_data,
                    ]
                ];
            }
        }

        if ($user->role->name === 'teacher')
        {
            $disciplines = $user->teacher->disciplines;
            $disciplines_data = [];
            $classes_data = [];
            $teacher_disciplines = DB::table('teachers_disciplines')
            ->where('teacher_id', $user->id)
            ->get();

            foreach ($teacher_disciplines as $teacher_discipline) {
                $discipline = Discipline::find($teacher_discipline->discipline_id);
                $discipline_data = [
                    'id' => $discipline->id,
                    'name' => $discipline->name,
                ];

                // Получаем классы, в которых учитель преподает данную дисциплину
                $class_ids = DB::table('discipline_student_classes')
                ->where('teacher_discipline_id', $teacher_discipline->id)
                ->pluck('student_class_id');

                $classes = StudentClass::whereIn('id', $class_ids)->get();
                $class_data = [];

                foreach ($classes as $class) {
                    $class_data[] = [
                        'id'=> $class->id,
                        'number' => $class->number,
                        'letter' => $class->letter,
                    ];
                }

                $classes_data[] = [
                    'discipline' => $discipline_data,
                    'classes' => $class_data,
                ];

                $disciplines_data[] = $discipline_data;
            }

            $response_data = [
                'user' => [
                    'user_data' => $user_data,
                    'role' => $role_data,
                    'social_links' => $social_links_data,
                    'disciplines' => $disciplines_data,
                    'classes' => $classes_data,
                ]
            ];
        }

        return response()->json($response_data);
    }

    public function getAuthUser(Request $request)
    {
        $user = $request->user();
        $user = $this->getUserById($user->id);
        return $user;
    }

    public function uploadAvatar(Request $request)
    {
        $user = $request->user();
        $filepath = $request->file('file')->store('avatars');
        $user->update(['avatar'=> $filepath]);
        $user->save();
    }
}
