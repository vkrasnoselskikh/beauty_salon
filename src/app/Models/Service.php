<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Service extends Model
{
    use HasFactory;

    protected $table = 'services';

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'price'
    ];

    public function materials(): HasManyThrough
    {
        return $this->hasManyThrough(Material::class, MaterialToService::class);
    }
}
