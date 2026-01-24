<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegNumber extends Model
{
    protected $fillable = [
       'reg_number',
       'is_used',
    ];
}
