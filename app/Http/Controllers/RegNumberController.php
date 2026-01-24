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
    public function update(Request $request, RegNumber $regNumber)
    {
        //
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
