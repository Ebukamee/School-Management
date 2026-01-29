<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    // 1. LIST ALL POSTS (The Home Feed)
    public function index()
    {
        return Inertia::render('blog/index', [
            'blogs' => Blog::with('author:id,name') // Eager load author for speed
                ->latest()
                ->paginate(10)
                ->map(function ($blog) {
                    return [
                        'title' => $blog->title,
                        'slug' => $blog->slug,
                        'cover_image' => $blog->cover_image,
                        // Create a short snippet for the card
                        'excerpt' => Str::limit($blog->content, 150), 
                        'created_at' => $blog->created_at,
                        'author' => $blog->author,
                        // Calculate "Read Time" (Avg 200 words per min)
                        'read_time' => ceil(str_word_count($blog->content) / 200) . ' min read',
                    ];
                }),
        ]);
    }
// 2. CREATE PAGE (The Editor)
    public function create()
    {
        return Inertia::render('blog/create');
    }
    // 2. SHOW ONE POST (The Renderer)
  public function show($slug) 
{
   
    $blog = Blog::where('slug', $slug)
        ->with('author:id,name')
        ->firstOrFail();

    
    return Inertia::render('blog/show', [
        'blog' => $blog
    ]);
}

    public function store(Request $request)
    {
 
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string', 
            'cover_image' => 'nullable|image|max:3072',
            'is_published' => 'boolean',
        ]);

        $slug = Str::slug($validated['title']) . '-' . uniqid();

        // HANDLE IMAGE UPLOAD
        $imagePath = null;
        if ($request->hasFile('cover_image')) {
           
            $imagePath = $request->file('cover_image')->store('blog-covers', 'public');
        }

        // CREATE THE DATABASE RECORD
        Blog::create([
            'title' => $validated['title'],
            'slug' => $slug,
            'content' => $validated['content'],
            'cover_image' => $imagePath, // Save the path, not the file
            'is_published' => $request->boolean('is_published', false),
            'user_id' => auth()->id(), // Link to the currently logged-in teacher
        ]);

        // 5. REDIRECT
        return redirect()->route('blog.index')->with('success', 'Post saved successfully!');
    }
}