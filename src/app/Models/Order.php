<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'user_id',
        'client_id',
        'status_id',
        'order_date',
        'description'
    ];

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'services_to_order');
    }
}
