<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    // List all users
    public function index(Request $request)
    {
        return Inertia::render('Users/index', [
            'users' => User::query()
                ->when($request->search, function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%")
                          ->orWhere('email', 'like', "%{$search}%");
                })
                ->latest()
                ->paginate(10) // Shows 10 users per page
                ->withQueryString(),
            'filters' => $request->only(['search']),
        ]);
    }

    // Delete a user
    public function destroy(User $user)
    {
        // 1. Prevent deleting yourself
        if (auth()->id() === $user->id) {
            return back()->withErrors(['error' => 'You cannot delete your own admin account.']);
        }

        // 2. Prevent deleting other Super Admins (Optional safety)
        if ($user->role === 'admin') {
              return back()->withErrors(['error' => 'You cannot delete another admin account.']);
        }

        $user->delete();

        return back()->with('success', 'User deleted successfully.');
    }
}