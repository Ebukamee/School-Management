<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TeacherOnly
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
   public function handle(Request $request, Closure $next): Response
{
    // Check if they are logged in!
    if (!auth()->check()) {
        return redirect('/login');
    }

    // Check if the logged-in user is a teacher
    if (auth()->user()->role !== 'teacher') {
        abort(403, 'Unauthorized');
    }

    return $next($request);
}
}
