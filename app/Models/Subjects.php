<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Results;

class Subjects extends Model
{
     protected $fillable = ['results_id', 'ca_score', 'exam_score', 'total','grade'];


    
     public function teacher() {
       return $this->belongsTo(Results::class,'result_id');
    }
    // use HasFactory;
}
