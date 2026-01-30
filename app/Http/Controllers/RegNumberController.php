<?php

namespace App\Http\Controllers;

use App\Models\RegNumber;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegNumberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('RegNumber/index', [
            'numbers' => RegNumber::latest()->paginate(10)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('RegNumber/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'reg_number' => 'required|unique:reg_numbers,reg_number|unique:users,reg_number'
        ]);

        RegNumber::create([
            'reg_number' => $request->reg_number
        ]);

        return back()->with('success', 'Reg Number added to allowlist.');
    }

    /**
     * Display the specified resource.
     */
    public function show(RegNumber $regNumber)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RegNumber $regNumber)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
   public function update(Request $request, $regNumber)
{
    // 1. Find the record using the string passed from the URL
    // We use where('reg_number', ...) because the frontend is sending the string ID
    $record = RegNumber::where('reg_number', $regNumber)->firstOrFail();

    // 2. Validate the incoming data
    $validated = $request->validate([
        'is_used' => 'required|boolean',
    ]);

    // 3. Update the database
    $record->update([
        'is_used' => $validated['is_used']
    ]);

    // 4. Return back to the frontend to trigger 'onSuccess'
    return back()->with('success', 'Registration number status updated.');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        RegNumber::findOrFail($id)->delete();
        return back()->with('success', 'Removed.');
    }
}
