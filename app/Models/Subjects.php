<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Class name changed to Singular 'Subject' to match Laravel standards
class Subjects extends Model
{
    use HasFactory;

    // FIX 1: Changed 'results_id' to 'result_id' to match your database
    // FIX 2: Added 'subject_name' so it actually saves to the DB
    protected $fillable = [
        'result_id', 
        'subject_name', 
        'ca_score', 
        'exam_score', 
        'total',
        'grade'
    ];

    /**
     * Relationship to the parent Result.
     * Renamed from 'teacher' to 'result' for clarity.
     */
    public function result() {
       return $this->belongsTo(Results::class, 'result_id');
    }
}