<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('discipline_student_classes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_class_id');
            $table->unsignedBigInteger('teacher_discipline_id');
            $table->timestamps();

            $table->foreign('student_class_id')->references('id')->on('student_classes');
            $table->foreign('teacher_discipline_id')->references('id')->on('teachers_disciplines');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('discipline_student_classes');
    }
};
