<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolClass extends Model
{
    use HasFactory;

    // We name the table explicitly just in case
    protected $table = 'school_classes';

    protected $fillable = [
        'subject',
        'grade_level',
        'day',
        'start_time',
        'end_time',
    ];
}