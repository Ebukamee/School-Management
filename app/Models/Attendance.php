<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'date',
        'status',
        'subject',
        'recorded_by',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    // Relationship to get Student details
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}