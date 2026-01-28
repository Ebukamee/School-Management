<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
 public function up()
{
    Schema::create('blogs', function (Blueprint $table) {
        $table->id();
        $table->string('title');
        $table->string('slug')->unique(); // For URLs: /blog/my-first-post
        $table->string('cover_image')->nullable();
        $table->longText('content'); // Use longText for big articles
        $table->boolean('is_published')->default(false);
        $table->foreignId('user_id')->constrained()->onDelete('cascade'); // The author
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
