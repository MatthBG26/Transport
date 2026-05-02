<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use Illuminate\Http\Request;

class VoitureController extends Controller
{
    public function index()
    {
        return response()->json(Voiture::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'marque' => 'required|string',
            'modele' => 'required|string',
            'immatriculation' => 'required|string|unique:voitures',
            'annee' => 'required|integer',
            'prix_par_jour' => 'required|numeric',
        ]);

        $voiture = Voiture::create($request->all());
        return response()->json($voiture, 201);
    }

    public function show($id)
    {
        $voiture = Voiture::with('locations')->findOrFail($id);
        return response()->json($voiture);
    }

    public function update(Request $request, $id)
    {
        $voiture = Voiture::findOrFail($id);
        $voiture->update($request->all());
        return response()->json($voiture);
    }

    public function destroy($id)
    {
        Voiture::findOrFail($id)->delete();
        return response()->json(['message' => 'Voiture supprimée']);
    }
}