<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{

    // Allow these fields to be filled
    protected $fillable = [
        'title',
        'slug',
        'content',
        'cover_image',
        'is_published',
        'user_id'
    ];

    // Relationship: A blog belongs to an Author (User)
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    // URL Helper: Use 'slug' instead of 'id' for links
    public function getRouteKeyName()
    {
        return 'slug';
    }
}