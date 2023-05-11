<?php

namespace App\Http\Controllers;

use App\Models\MaterialToService;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index(Request $request)
    {
        $now = Carbon::now();
        $user = $request->user();
        $nearest_order = $user->orders()
            ->where('status_id', '!=', 2)
            ->where('status_id', '!=', 5)
            ->where('order_date', '>=', $now)
            ->orderBy('order_date', 'asc')
            ->with('status')
            ->with('client')
            ->with('services')
            ->first();

        $services_ids = [];

        foreach ($nearest_order->services as $s) {
            $services_ids[] = $s->id;
        }

        $nearest_order_services = MaterialToService::whereIn('service_id', $services_ids)->with('material')->get();

        return Inertia::render('Main', [
            'nearest_order' => $nearest_order,
            'nearest_order_services' => $nearest_order_services
        ]);
    }
}
