<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeWork extends Model
{
    protected $fillable = [
        'created_by',
        'subject',
        'title',
        'class',
        'form',
        'description',
        'due_date',
        'image_path',
    ];

    protected $casts = [
        'due_date' => 'date',
    ];
}
