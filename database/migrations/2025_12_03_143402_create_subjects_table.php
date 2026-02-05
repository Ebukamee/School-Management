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
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('subject_name');
            $table->foreignId('result_id')->constrained('results')->onDelete('cascade');
            $table->integer('ca_score');
            $table->integer('exam_score');
            $table->integer('total');
            $table->string('grade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};
