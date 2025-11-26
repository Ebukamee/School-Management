<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Results extends Model
{
    protected $fillable = ['name', 'reg_number', 'subjects', 'class', ,'image','teacher','remark'];

    use HasFactory;
}
