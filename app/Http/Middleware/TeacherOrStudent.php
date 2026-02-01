<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TeacherOrStudent
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
{
    $user = $request->user();

    // Check if user is logged in AND is either a teacher or student
    if ($user && ($user->role === 'teacher' || $user->role === 'student')) {
        return $next($request);
    }

    abort(403, 'Access restricted to Teachers and Students only.');
}
}
