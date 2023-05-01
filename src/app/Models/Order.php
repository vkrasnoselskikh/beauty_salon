<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Order extends Model
{
    use HasFactory;

    protected $table='orders';

    protected $fillable=[
        'user_id',
        'client_id',
        'status_id',
        'date',
        'description'
    ];

    public function services(): HasManyThrough
    {
        return $this->hasManyThrough(Service::class, ServiceToOrder::class);
    }
}
