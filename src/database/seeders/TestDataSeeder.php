<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Material;
use App\Models\MaterialToService;
use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\Service;
use App\Models\ServiceToOrder;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    private function create_clietns($user_id)
    {
        $count_materials_for_user = Client::where('user_id', $user_id)->count();
        if ($count_materials_for_user == 0) {
            Client::factory(5)->create([
                'user_id' => 1
            ]);
        }
    }

    private function create_materials($user_id)
    {
        $count_materials_for_user = Material::where('user_id', $user_id)->count();

        if ($count_materials_for_user == 0) {
            $materials = [
                [
                    'name' => 'Резинка',
                    'quantity' => '15',
                    'unit_of_measure' => 'шт'
                ],
                [
                    'name' => 'Заколка',
                    'quantity' => '15',
                    'unit_of_measure' => 'шт'
                ],
                [
                    'name' => 'Лак',
                    'quantity' => '400',
                    'unit_of_measure' => 'мл'
                ],
                [
                    'name' => 'Шпилька',
                    'quantity' => '50',
                    'unit_of_measure' => 'шт'
                ],
            ];

            foreach ($materials as $material) {
                $material['user_id'] = $user_id;
                Material::create($material);
            }
        }
    }

    private function create_services($user_id): void
    {
        $count = Service::where('user_id', $user_id)->count();

        if ($count == 0) {
            $services = [
                [
                    'name' => 'Укладка',
                    'price' => '500'
                ],
                [
                    'name' => 'Завивка',
                    'price' => '500'
                ],
                [
                    'name' => 'Покраска',
                    'price' => '700'
                ],
                [
                    'name' => 'Макияж',
                    'price' => '2500'
                ],
            ];

            foreach ($services as $row) {
                $row['user_id'] = $user_id;
                Service::create($row);
            }

            foreach (Service::where('user_id', $user_id) as $rowService) {
                $count_services = rand(1, 5);
                $materials = Material::all()->random($count_services);

                foreach ($materials as $m) {
                    MaterialToService::create([
                        'material_id' => $m->id,
                        'service_id' => $rowService->id,
                        'quantity' => rand(2, 10)
                    ]);
                }

            }

            $this->create_materials_to_service($user_id);
        }
    }

    private function create_materials_to_service($user_id): void
    {
        $services = Service::where('user_id', $user_id)->get();
        foreach ($services as $rowService) {
            $count_materials = rand(1, 5);
            $materials = Material::all()->random($count_materials);


            foreach ($materials as $m) {
                MaterialToService::create([
                    'material_id' => $m->id,
                    'service_id' => $rowService->id,
                    'quantity' => rand(2, 10)
                ]);
            }

        }
    }

    private function create_orders($user_id): void
    {
        for ($order_number = 0; $order_number < 10; $order_number++) {
            Order::create([
                'user_id' => $user_id,
                'client_id' => Client::all()->random()->id,
                'status_id' => OrderStatus::all()->random()->id,
                'date' => Carbon::today()->addDays(rand(1, 365)),
                'description' => 'Test'
            ]);
        }
    }

    private function create_service_to_order($user_id): void
    {
        foreach (Order::all() as $order) {
            $count_services = rand(1, 2);
            $services = Service::all()->random($count_services);

            foreach ($services as $service) {
                ServiceToOrder::create([
                    'order_id' => $order->id,
                    'service_id' => $service->id
                ]);
            }
        }
    }

    public function run()
    {
        $user_id = 1;

        $this->create_clietns($user_id);
        $this->create_materials($user_id);
        $this->create_services($user_id);
        $this->create_orders($user_id);
        $this->create_service_to_order($user_id);
    }
}
