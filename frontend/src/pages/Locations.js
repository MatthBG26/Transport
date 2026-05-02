import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Locations() {
  const [locations, setLocations] = useState([]);
  const [voitures, setVoitures] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    voiture_id: '', client_id: '', date_debut: '', date_fin: '', statut: 'en_cours'
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/locations').then(res => setLocations(res.data));
    axios.get('http://127.0.0.1:8000/api/v1/voitures').then(res => setVoitures(res.data));
    axios.get('http://127.0.0.1:8000/api/v1/clients').then(res => setClients(res.data));
  }, []);

  const handleSubmit = () => {
    if (!form.voiture_id || !form.client_id || !form.date_debut || !form.date_fin) {
      setNotification({ type: 'error', message: '⚠️ Remplis tous les champs !' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    axios.post('http://127.0.0.1:8000/api/v1/locations', form)
      .then(res => {
        setLocations([...locations, res.data]);
        setForm({ voiture_id: '', client_id: '', date_debut: '', date_fin: '', statut: 'en_cours' });
        setNotification({ type: 'success', message: '✅ Location créée avec succès !' });
        setTimeout(() => setNotification(null), 3000);
      })
      .catch(() => {
        setNotification({ type: 'error', message: '❌ Erreur — voiture non disponible ?' });
        setTimeout(() => setNotification(null), 3000);
      });
  };

  const handleStatutChange = (id, newStatut) => {
    axios.put(`http://127.0.0.1:8000/api/v1/locations/${id}`, { statut: newStatut })
      .then(() => {
        setLocations(locations.map(l => l.id === id ? {...l, statut: newStatut} : l));
        setNotification({ type: 'success', message: '✅ Statut mis à jour !' });
        setTimeout(() => setNotification(null), 3000);
      });
  };

  const getStatutStyle = (statut) => {
    const styles = {
      en_cours: { background: '#e94560', color: 'white' },
      terminee: { background: '#28a745', color: 'white' },
      annulee: { background: '#6c757d', color: 'white' },
    };
    return styles[statut] || {};
  };

  return (
    <div>
      <h2>📋 Locations</h2>

      {notification && (
        <div style={{
          padding: '10px 20px',
          borderRadius: '6px',
          marginBottom: '15px',
          background: notification.type === 'success' ? '#d4edda' : '#f8d7da',
          color: notification.type === 'success' ? '#155724' : '#721c24',
          fontWeight: 'bold'
        }}>
          {notification.message}
        </div>
      )}

      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Créer une location</h3>

        <select value={form.voiture_id} onChange={e => setForm({...form, voiture_id: e.target.value})} style={{ margin: '5px', padding: '8px' }}>
          <option value="">-- Choisir une voiture --</option>
          {voitures.filter(v => v.statut === 'disponible').map(v => (
            <option key={v.id} value={v.id}>{v.marque} {v.modele} ({v.immatriculation})</option>
          ))}
        </select>

        <select value={form.client_id} onChange={e => setForm({...form, client_id: e.target.value})} style={{ margin: '5px', padding: '8px' }}>
          <option value="">-- Choisir un client --</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.nom} {c.prenom}</option>
          ))}
        </select>

        <input type="date" value={form.date_debut} onChange={e => setForm({...form, date_debut: e.target.value})} style={{ margin: '5px', padding: '8px' }} />
        <input type="date" value={form.date_fin} onChange={e => setForm({...form, date_fin: e.target.value})} style={{ margin: '5px', padding: '8px' }} />

        <select value={form.statut} onChange={e => setForm({...form, statut: e.target.value})} style={{ margin: '5px', padding: '8px' }}>
          <option value="en_cours">En cours</option>
          <option value="terminee">Terminée</option>
          <option value="annulee">Annulée</option>
        </select>

        <button onClick={handleSubmit} style={{ margin: '5px', padding: '8px 15px', background: '#e94560', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Créer
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1a1a2e', color: 'white' }}>
            <th style={{ padding: '10px' }}>Voiture</th>
            <th style={{ padding: '10px' }}>Client</th>
            <th style={{ padding: '10px' }}>Date début</th>
            <th style={{ padding: '10px' }}>Date fin</th>
            <th style={{ padding: '10px' }}>Montant</th>
            <th style={{ padding: '10px' }}>Statut</th>
          </tr>
        </thead>
        <tbody>
          {locations.map(l => (
            <tr key={l.id} style={{ borderBottom: '1px solid #ddd', textAlign: 'center' }}>
              <td style={{ padding: '10px' }}>{l.voiture?.marque} {l.voiture?.modele}</td>
              <td style={{ padding: '10px' }}>{l.client?.nom} {l.client?.prenom}</td>
              <td style={{ padding: '10px' }}>{l.date_debut}</td>
              <td style={{ padding: '10px' }}>{l.date_fin}</td>
              <td style={{ padding: '10px' }}>{l.montant_total} FCFA</td>
              <td style={{ padding: '10px' }}>
                <select
                  value={l.statut}
                  onChange={e => handleStatutChange(l.id, e.target.value)}
                  style={{ ...getStatutStyle(l.statut), padding: '4px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                >
                  <option value="en_cours">En cours</option>
                  <option value="terminee">Terminée</option>
                  <option value="annulee">Annulée</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Locations;