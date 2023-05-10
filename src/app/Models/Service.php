<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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

    public function materials(): BelongsToMany
    {
        return $this->belongsToMany(Material::class, 'material_to_services');
    }


}
