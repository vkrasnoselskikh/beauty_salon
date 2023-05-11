<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\ServiceToOrder;
use Carbon\Carbon;
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
            'clients' => $user->clients,
            'services' => $user->services,
            'statuses' => OrderStatus::all(),
            'orders' => Order::with('services')->get()
        ]);
    }

    public function add_index(Request $request): Response
    {
        $user = $request->user();

        return Inertia::render('Order/AddOrder', [
            'clients' => $user->clients,
            'services' => $user->services,
            'statuses' => OrderStatus::all()
        ]);
    }

    public function create(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'status_id' => 'required|exists:orders_statuses,id',
            'order_date' => 'required|date',
            'services_ids' => 'required|array',
            'services_ids.*' => 'exists:services,id',
            'description' => 'nullable'
        ]);

        $order = new Order();

        $order->user_id = $request->user()->id;
        $order->order_date = $validatedData['order_date'];
        $order->client_id = $validatedData['client_id'];
        $order->status_id = $validatedData['status_id'];
        $order->description = $validatedData['description'];
        $order->save();

        foreach ($validatedData['services_ids'] as $service_id) {
            ServiceToOrder::create([
                'order_id' => $order->id,
                'service_id' => $service_id
            ]);
        }

        return to_route('orders.index');
    }

    public function update(Request $request, Order $order): RedirectResponse
    {

        if ($request->user()->cannot('update', $order)) {
            abort(403);
        }


        $validatedData = $request->validate([
            'status_id' => 'required|exists:orders_statuses,id',
            'order_date' => 'required|date',
            'description' => 'nullable'
        ]);


        $order->status_id = $validatedData['status_id'];
        $order->order_date = Carbon::parse($validatedData['order_date']);
        $order->description = $validatedData['description'];

        $order->save();
        return to_route('orders.index', status: 303);
    }

    public function set_status(Request $request, Order $order, OrderStatus $status): RedirectResponse
    {

        if ($request->user()->cannot('update', $order)) {
            abort(403);
        }

        $order->status_id = $status->id;
        $order->save();
        return to_route('main', status: 303);
    }

    public function delete(Request $request, Order $order): RedirectResponse
    {

        if ($request->user()->cannot('delete', $order)) {
            abort(403);
        }

        $order->delete();

        return to_route('orders.index');
    }
}
