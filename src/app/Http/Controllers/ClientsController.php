<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Client;


class ClientsController extends Controller
{
    public function index(Request $request): Response
    {
        $clients = $request->user()->clients;
        return Inertia::render('Clients/Clients', ['clients'=>$clients]);
    }

    public function add_index(Request $request): Response
    {
        return Inertia::render('Clients/AddClient');
    }

    public function create(Request $request):RedirectResponse
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|string|max:255'
        ]);

        $client = new Client();

        $client->user_id = $request->user()->id;
        $client->first_name = $validatedData['first_name'];
        $client->last_name = $validatedData['last_name'];
        $client->phone = $validatedData['phone'];
        $client->email = $validatedData['email'];

        $client->save();

        return to_route('clients.index');
    }

    public function update(Request $request, Client $client): RedirectResponse
    {
        if ($request->user()->cannot('update', $client)) {
            abort(403);
        }

        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'email' => 'required|string|max:255'
        ]);

        $client->first_name = $validatedData['first_name'];
        $client->last_name = $validatedData['last_name'];
        $client->phone = $validatedData['phone'];
        $client->email = $validatedData['email'];

        $client->save();

        return to_route('clients.index');
    }

    public function delete(Request $request,  Client $client): RedirectResponse
    {
        if ($request->user()->cannot('delete', $client)) {
            abort(403);
        }

        $client->delete();

        return to_route('clients.index');
    }
}
