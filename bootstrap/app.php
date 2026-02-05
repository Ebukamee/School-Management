<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Inertia\Inertia;
use Illuminate\Http\Request;
// 👇 These two lines were missing!
use Symfony\Component\HttpFoundation\Response;
// use Throwable;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);
        $middleware->trustProxies(at: '*');

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
        
        $middleware->alias([
            'teacher' => \App\Http\Middleware\TeacherOnly::class,
            'student' => \App\Http\Middleware\StudentOnly::class,
            'admin'   => \App\Http\Middleware\AdminOnly::class,
            'teacher_student' => \App\Http\Middleware\TeacherOrStudent::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            
            // Note: This logic only runs on Production (not local)
            // If you want to TEST the error page locally, remove "! app()->environment('local') &&" temporarily.
            $validStatuses = [500,503, 404, 403];
            // use next line later in production
            // if (! app()->environment('local') && in_array($response->getStatusCode(), $validStatuses))

           if (in_array($response->getStatusCode(), [500, 503, 404, 403])) {
                return Inertia::render('errors', ['status' => $response->getStatusCode()])
                    ->toResponse($request)
                    ->setStatusCode($response->getStatusCode());
            }

            return $response;
        });
    })->create();