<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaterialToService extends Model
{
    use HasFactory;

    protected $table = 'material_to_services';

    protected $fillable = [
        'material_id',
        'service_id',
        'quantity'
    ];

    public $timestamps = false;
}
