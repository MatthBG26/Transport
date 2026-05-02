<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voiture extends Model
{
    protected $fillable = [
        'marque',
        'modele',
        'immatriculation',
        'annee',
        'prix_par_jour',
        'statut',
    ];

    public function locations()
    {
        return $this->hasMany(Location::class);
    }
}