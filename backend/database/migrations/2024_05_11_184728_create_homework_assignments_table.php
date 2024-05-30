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
        Schema::create('homework_assignments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('homework_id');
            $table->unsignedBigInteger('student_id');
            $table->boolean('completion_status')->default(0);
            $table->text('response_text')->nullable();
            $table->string('file_path')->nullable();
            $table->boolean('checked')->default(0);
            $table->string('teacher_note')->nullable();
            $table->unsignedBigInteger('grade_id')->nullable();
            $table->timestamp('checked_at')->nullable();
            $table->timestamp('done_at')->nullable();
            $table->timestamps();

            $table->foreign('homework_id')->references('id')->on('homeworks');
            $table->foreign('student_id')->references('id')->on('students');
            $table->foreign('grade_id')->references('id')->on('grades');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('homework_assignments');
    }
};
