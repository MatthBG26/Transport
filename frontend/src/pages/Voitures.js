import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Voitures() {
  const [voitures, setVoitures] = useState([]);
  const [form, setForm] = useState({
    marque: '', modele: '', immatriculation: '', annee: '', prix_par_jour: '', statut: 'disponible'
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/voitures')
      .then(res => setVoitures(res.data));
  }, []);

  const handleSubmit = () => {
    if (!form.marque || !form.modele || !form.immatriculation || !form.annee || !form.prix_par_jour) {
      setNotification({ type: 'error', message: '⚠️ Remplis tous les champs !' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    axios.post('http://127.0.0.1:8000/api/v1/voitures', form)
      .then(res => {
        setVoitures([...voitures, res.data]);
        setForm({ marque: '', modele: '', immatriculation: '', annee: '', prix_par_jour: '', statut: 'disponible' });
        setNotification({ type: 'success', message: '✅ Voiture ajoutée avec succès !' });
        setTimeout(() => setNotification(null), 3000);
      })
      .catch(() => {
        setNotification({ type: 'error', message: '❌ Erreur — immatriculation déjà existante ?' });
        setTimeout(() => setNotification(null), 3000);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/v1/voitures/${id}`)
      .then(() => {
        setVoitures(voitures.filter(v => v.id !== id));
        setNotification({ type: 'success', message: '✅ Voiture supprimée !' });
        setTimeout(() => setNotification(null), 3000);
      })
      .catch(() => {
        setNotification({ type: 'error', message: '❌ Impossible de supprimer cette voiture !' });
        setTimeout(() => setNotification(null), 3000);
      });
  };

  const handleStatutChange = (id, newStatut) => {
    axios.put(`http://127.0.0.1:8000/api/v1/voitures/${id}`, { statut: newStatut })
      .then(res => {
        setVoitures(voitures.map(v => v.id === id ? res.data : v));
        setNotification({ type: 'success', message: '✅ Statut mis à jour !' });
        setTimeout(() => setNotification(null), 3000);
      });
  };

  const getStatutStyle = (statut) => {
    const styles = {
      disponible: { background: '#28a745', color: 'white' },
      louee: { background: '#dc3545', color: 'white' },
      maintenance: { background: '#ffc107', color: 'black' },
    };
    return styles[statut] || {};
  };

  return (
    <div>
      <h2>🚗 Voitures</h2>

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
        <h3>Ajouter une voiture</h3>
        <input placeholder="Marque" value={form.marque} onChange={e => setForm({...form, marque: e.target.value})} style={{ margin: '5px', padding: '8px' }} />
        <input placeholder="Modèle" value={form.modele} onChange={e => setForm({...form, modele: e.target.value})} style={{ margin: '5px', padding: '8px' }} />
        <input placeholder="Immatriculation" value={form.immatriculation} onChange={e => setForm({...form, immatriculation: e.target.value})} style={{ margin: '5px', padding: '8px' }} />
        <input placeholder="Année" value={form.annee} onChange={e => setForm({...form, annee: e.target.value})} style={{ margin: '5px', padding: '8px' }} />
        <input placeholder="Prix/jour (nombre)" value={form.prix_par_jour} onChange={e => setForm({...form, prix_par_jour: e.target.value})} style={{ margin: '5px', padding: '8px' }} />
        <select value={form.statut} onChange={e => setForm({...form, statut: e.target.value})} style={{ margin: '5px', padding: '8px' }}>
          <option value="disponible">Disponible</option>
          <option value="louee">Louée</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <button onClick={handleSubmit} style={{ margin: '5px', padding: '8px 15px', background: '#e94560', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Ajouter
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1a1a2e', color: 'white' }}>
            <th style={{ padding: '10px' }}>Marque</th>
            <th style={{ padding: '10px' }}>Modèle</th>
            <th style={{ padding: '10px' }}>Immatriculation</th>
            <th style={{ padding: '10px' }}>Année</th>
            <th style={{ padding: '10px' }}>Prix/jour</th>
            <th style={{ padding: '10px' }}>Statut</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {voitures.map(v => (
            <tr key={v.id} style={{ borderBottom: '1px solid #ddd', textAlign: 'center' }}>
              <td style={{ padding: '10px' }}>{v.marque}</td>
              <td style={{ padding: '10px' }}>{v.modele}</td>
              <td style={{ padding: '10px' }}>{v.immatriculation}</td>
              <td style={{ padding: '10px' }}>{v.annee}</td>
              <td style={{ padding: '10px' }}>{v.prix_par_jour} FCFA</td>
              <td style={{ padding: '10px' }}>
                <select
                  value={v.statut}
                  onChange={e => handleStatutChange(v.id, e.target.value)}
                  style={{ ...getStatutStyle(v.statut), padding: '4px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
                >
                  <option value="disponible">Disponible</option>
                  <option value="louee">Louée</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </td>
              <td style={{ padding: '10px' }}>
                <button onClick={() => handleDelete(v.id)} style={{ padding: '5px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  🗑️ Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Voitures;