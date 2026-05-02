<?php

namespace App\Http\Controllers;

use App\Models\Location;
use App\Models\Voiture;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    public function index()
    {
        return response()->json(Location::with('voiture', 'client')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'voiture_id' => 'required|exists:voitures,id',
            'client_id' => 'required|exists:clients,id',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
        ]);

        $voiture = Voiture::findOrFail($request->voiture_id);

        if ($voiture->statut !== 'disponible') {
            return response()->json(['message' => 'Voiture non disponible'], 400);
        }

        $jours = now()->parse($request->date_debut)->diffInDays($request->date_fin);
        $montant = $jours * $voiture->prix_par_jour;

        $location = Location::create([
            'voiture_id' => $request->voiture_id,
            'client_id' => $request->client_id,
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,
            'montant_total' => $montant,
            'statut' => 'en_cours',
        ]);

        $voiture->update(['statut' => 'louee']);

        return response()->json($location->load('voiture', 'client'), 201);
    }

    public function show($id)
    {
        $location = Location::with('voiture', 'client')->findOrFail($id);
        return response()->json($location);
    }

    public function update(Request $request, $id)
    {
        $location = Location::findOrFail($id);
        $location->update($request->all());

        if ($request->statut === 'terminee') {
            $location->voiture->update(['statut' => 'disponible']);
        }

        return response()->json($location);
    }
}