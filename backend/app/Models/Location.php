<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    protected $fillable = [
        'voiture_id',
        'client_id',
        'date_debut',
        'date_fin',
        'montant_total',
        'statut',
    ];

    public function voiture()
    {
        return $this->belongsTo(Voiture::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}