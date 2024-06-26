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
        Schema::create('homeworks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('teacher_discipline_id');
            $table->unsignedBigInteger('student_class_id');
            $table->string('description');
            $table->timestamp('deadline')->nullable();
            $table->timestamps();

            $table->foreign('teacher_discipline_id')->references('id')->on('teachers_disciplines');
            $table->foreign('student_class_id')->references('id')->on('student_classes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('homework');
    }
};
