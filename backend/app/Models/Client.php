<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'telephone',
        'permis_conduire',
    ];

    public function locations()
    {
        return $this->hasMany(Location::class);
    }
}