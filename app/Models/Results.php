<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Subjects;

class Results extends Model
{
    protected $fillable = ['user_id', 'reg_number', 'session', 'class','term' ,'created_by','remark'];


    public function subjects() {
        return $this->hasMany(Subjects::class);
    }
     public function student() {
        return $this->belongsTo(User::class,'user_id');
    }
     public function teacher() {
       return $this->belongsTo(User::class,'created_by');
    }

    // use HasFactory;
}
