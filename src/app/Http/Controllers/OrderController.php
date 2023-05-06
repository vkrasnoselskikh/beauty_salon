<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderStatus;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        return Inertia::render('Order/EditOrders', [
            'clients'=> $user->clients,
            'services'=>$user->services,
            'statuses'=>  OrderStatus::all(),
            'orders'=> Order::with('services')->get()
        ]);
    }

    public function add_index(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Order/AddOrder', [
            'clients'=> $user->clients,
            'services'=>$user->services,
            'statuses'=>  OrderStatus::all()
        ]);
    }

    public function create(Request $request): RedirectResponse
    {

        $validatedData = $request->validate([
            'client_id' => 'required|exists:client,id',
            'status_id' => 'required|exists:status,id',
            'service_id' => 'required|exists:service,id',
            'description'=> 'nullable'
        ]);

        $order = new Order();

        $order->user_id = $request->user()->id;

        return to_route('orders.edit', $order->id);
    }
}
