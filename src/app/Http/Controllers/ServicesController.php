<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class ServicesController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        return Inertia::render('Services/Services', ['services' => $user->services]);
    }

    public function add_index(Request $request): Response
    {
        $user = $request->user();
        return Inertia::render('Services/AddService', ['materials' => $user->materials]);
    }
}
