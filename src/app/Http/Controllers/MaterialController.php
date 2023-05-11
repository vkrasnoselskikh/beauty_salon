<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class MaterialController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        return Inertia::render('Materials/Materials', [
            'materials' => $user->materials,
        ]);
    }

    public function add_index(Request $request): Response
    {
        return Inertia::render('Materials/AddMaterial');
    }

    public function create(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'quantity' => 'required|numeric',
            'unit_of_measure' => 'required|string|max:255',
        ]);

        $material = new Material();
        $material->user_id = $request->user()->id;
        $material->name = $validatedData['name'];
        $material->quantity = $validatedData['quantity'];
        $material->unit_of_measure = $validatedData['unit_of_measure'];
        $material->save();
        return to_route('materials.index');
    }

    public function update(Request $request, Material $material): RedirectResponse
    {
        if ($request->user()->cannot('update', $material)) {
            abort(403);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'quantity' => 'required|numeric',
            'unit_of_measure' => 'required|string|max:255',
        ]);

        $material->name = $validatedData['name'];
        $material->quantity = $validatedData['quantity'];
        $material->unit_of_measure = $validatedData['unit_of_measure'];
        $material->save();

        return to_route('materials.index');
    }

    public function delete(Request $request, Material $material): RedirectResponse
    {
        if ($request->user()->cannot('delete', $material)) {
            abort(403);
        }

        $material->delete();

        return to_route('materials.index');
    }
}
