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
            'subject' => 'required|string|max:50',
            'title' => 'required|string|max:100',
            'form' => 'required|string|max:20',
            'class' => 'required|string|max:20',
            'description' => 'required|string',
            'due_date' => 'required|date|after_or_equal:today',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('homeworks', 'public');
        }

        HomeWork::create([
            'created_by' => auth()->user()->name,
            'subject' => $validated['subject'],
            'title' => $validated['title'],
            'form' => $validated['form'],
            'class' => $validated['class'],
            'description' => $validated['description'],
            'due_date' => $validated['due_date'],
            'image_path' => $imagePath,
        ]);

        return redirect()->route('homework.index');
    }
    public function show($id)
    {
        // 1. Find the homework or fail with 404
        $homework = HomeWork::findOrFail($id);

        if (auth()->user()->form != $homework->form || auth()->user()->class !== $homework->class) {
            abort(403, 'Unauthorized');
        }
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
    public function update(Request $request, $id)
    {
        $homework = HomeWork::findOrFail($id);

        $data = $request->validate([
            'subject' => 'required|string',
            'title' => 'required|string',
            'form' => 'required|string',
            'class' => 'required|string',
            'description' => 'required|string',
            'due_date' => 'required|date',
            'image' => 'nullable|file|mimes:jpg,png,pdf|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if needed
            // Storage::delete($homework->image_path);

            $data['image_path'] = $request->file('image')->store('homeworks', 'public');
        }

        unset($data['image']); // Clean up

        $homework->update($data);

        return redirect('/homework/manage')->with('success', 'Homework updated successfully');
    }
    public function manage(Request $request)
    {
        // 1. Get the current logged-in user's name
        // (Since your DB stores 'created_by' as a string name)
        $userName = auth()->user()->name;

        // 2. Start the query: Only show homework created by THIS user
        $query = HomeWork::where('created_by', $userName);

        // 3. Handle Search (if the user typed something in the search bar)
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%")
                    ->orWhere('target_class', 'like', "%{$search}%"); // Search class too if you like
            });
        }

        // 4. Get results: Newest first, 10 per page
        // withQueryString() keeps the search term in the URL during pagination
        $homeworks = $query->latest()
            ->paginate(10)
            ->withQueryString();

        // 5. Return the Manage View
        return Inertia::render('homework/manage', [
            'homeworks' => $homeworks
        ]);
    }
    public function edit($id)
    {
        $homework = HomeWork::findOrFail($id);

        // Security: Ensure only the creator can edit this homework
        if ($homework->created_by !== auth()->user()->name) {
            abort(403, 'Unauthorized action.');
        }

        return Inertia::render('homework/edit', [
            'homework' => $homework
        ]);
    }
}
