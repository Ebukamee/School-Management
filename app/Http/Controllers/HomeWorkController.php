<?php

namespace App\Http\Controllers;

use App\Models\HomeWork;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeWorkController extends Controller
{
    public function index()
    {
        return Inertia::render('homework/index', [
            'homeworks' => HomeWork::where('form', auth()->user()->form)->where('class', auth()->user()->class)->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('homework/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'subject'      => 'required|string|max:50',
            'title'        => 'required|string|max:100',
            'form' => 'required|string|max:20',
            'class' => 'required|string|max:20',
            'description'  => 'required|string',
            'due_date'     => 'required|date|after_or_equal:today',
            'image'        => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', 
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('homeworks', 'public');
        }

        HomeWork::create([
            'created_by'   => auth()->user()->name, 
            'subject'      => $validated['subject'],
            'title'        => $validated['title'],
            'form' => $validated['form'],
            'class' => $validated['class'],
            'description'  => $validated['description'],
            'due_date'     => $validated['due_date'],
            'image_path'   => $imagePath,
        ]);

        return redirect()->route('homework.index');
    }
public function show($id)
{
    // 1. Find the homework or fail with 404
    $homework = HomeWork::findOrFail($id);

    // 2. Return the view with the data
    return Inertia::render('homework/show', [
        'homework' => [
            'id' => $homework->id,
            'title' => $homework->title,
            'subject' => $homework->subject,
            'form' => $homework->form,
            'class' => $homework->class,
            'description' => $homework->description,
            'due_date' => $homework->due_date,
            'image_path' => $homework->image_path,
            'created_at' => $homework->created_at,
            'created_by' => [
                'name' => $homework->created_by,
            ],
        ]
    ]);
}
    public function destroy($id)
    {
        $homework = HomeWork::findOrFail($id);

        // Security check is handled by your Middleware
        
        // Clean up image if it exists
        if ($homework->image_path) {
            Storage::disk('public')->delete($homework->image_path);
        }

        $homework->delete();

        return redirect()->back();
    }
}