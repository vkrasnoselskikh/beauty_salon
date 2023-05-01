<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceToOrder extends Model
{
    use HasFactory;

    protected $table = 'services_to_order';

    protected $fillable = [
        'order_id',
        'service_id',
    ];

    public $timestamps = false;
}
