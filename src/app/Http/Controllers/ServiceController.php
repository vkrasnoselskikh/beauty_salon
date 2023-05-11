<?php

namespace App\Http\Controllers;

use App\Models\MaterialToService;
use App\Models\Service;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class ServiceController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $services = $user->services;
        return Inertia::render('Services/Services', ['services' => $user->services]);
    }

    public function add_index(Request $request): Response
    {
        $user = $request->user();
        return Inertia::render('Services/AddService', ['materials' => $user->materials]);
    }

    public function edit_index(Request $request, Service $service): Response
    {
        $user = $request->user();

        if ($user->cannot('view', $service)) {
            abort(403);
        }
        $load = $service->materials;
        return Inertia::render('Services/EditService', [
            'service' => $service,
            'materials' => $user->materials,
        ]);
    }

    public function create(Request $request): RedirectResponse
    {
        $user = $request->user();

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'price' => 'required|numeric',
        ]);

        $service = new Service();

        $service->user_id = $user->id;
        $service->name = $validatedData['name'];
        $service->description = $validatedData['description'];
        $service->price = $validatedData['price'];
        $service->save();


        return to_route('services.edit', $service->id);
    }

    public function update(Request $request, Service $service): RedirectResponse
    {
        $user = $request->user();

        if ($user->cannot('update', $service)) {
            abort(403);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:2000',
            'price' => 'required|numeric',
            'materials' => 'array'
        ]);


        $service->name = $validatedData['name'];
        $service->description = $validatedData['description'];
        $service->price = $validatedData['price'];
        $service->save();

        if (count($validatedData['materials']) > 0) {
            MaterialToService::where('service_id', $service->id)->delete();
            foreach ($validatedData['materials'] as $m) {
                MaterialToService::create([
                    'service_id' => $service->id,
                    'material_id' => $m['material_id'],
                    'quantity' => $m['quantity'],
                ]);
            }
        }

        return to_route('services.index');
    }

    public function delete(Request $request, Service $service): RedirectResponse
    {
        $user = $request->user();

        if ($user->cannot('delete', $service)) {
            abort(403);
        }

        $service->delete();

        return to_route('services.index');
    }
}
