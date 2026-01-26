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
        Schema::create('home_works', function (Blueprint $table) {
            $table->id();
            $table->string('created_by'); 
            $table->string('subject');
            $table->string('title');
            $table->string('form');
            $table->string('class');
            $table->text('description');
            $table->date('due_date');
            $table->string('image_path')->nullable(); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_works');
    }
};
