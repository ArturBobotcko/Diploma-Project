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
        Schema::create('students', function (Blueprint $table) {
            $table->unsignedBigInteger('id');
            $table->unsignedBigInteger('student_class_id')->nullable();

            $table->foreign('id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('student_class_id')->references('id')->on('student_classes');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
