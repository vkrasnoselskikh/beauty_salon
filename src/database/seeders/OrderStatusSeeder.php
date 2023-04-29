<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = [
            
            [
                'id' => 1,
                'name' => 'Новый',
                'description' => 'Заказ создан, но еще не обработан',
            ],

            [
                'id' => 2,
                'name' => 'Отменен',
                'description' => 'Заказ отменен',
            ],

            [
                'id' => 3,
                'name' => 'Ждет исполнения',
                'description' => 'Заказ обработан и готов к исполнению',
            ],

            [
                'id' => 4,
                'name' => 'В работе',
                'description' => 'Заказ в работе',
            ],
            [
                'id' => 5,
                'name' => 'Выполнен',
                'description' => 'Заказ выполнен',
            ]
        ];

        DB::table('orders_statuses')->upsert($statuses, ['id'], ['name', 'description']);
    }
}
