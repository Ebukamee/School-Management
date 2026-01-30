<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use App\Models\RegNumber;
use Inertia\Inertia;

class CreateNewUser implements CreatesNewUsers
{

    use PasswordValidationRules;


    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        $nextAvailable = RegNumber::where('is_used', false)
            ->orderBy('id', 'asc')
            ->first();

        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
            'reg_number' => [
                'required_if:role,student',
                'nullable', 
                'string',
                'max:20',
                'unique:users,reg_number', 
                'exists:reg_numbers,reg_number', 
            ],
        ])->validate();

        return User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
            'role' => $input['role'],
            'reg_number' => ($input['role'] === 'student') ? $input['reg_number'] : null
        ]);
    }
}
