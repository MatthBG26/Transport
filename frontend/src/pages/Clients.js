import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '', telephone: '', permis_conduire: ''
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/v1/clients')
      .then(res => setClients(res.data));
  }, []);

  const handleSubmit = () => {
    axios.post('http://127.0.0.1:8000/api/v1/clients', form)
      .then(res => setClients([...clients, res.data]));
  };

  return (
    <div>
      <h2>👤 Clients</h2>

      <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
        <h3>Ajouter un client</h3>
        <input placeholder="Nom" onChange={e => setForm({...form, nom: e.target.value})} style={{ margin: '5px', padding: '8px' }} />
        <input placeholder="Prénom" onChange={e => setForm({...form, prenom: e.target.value})} style={{ margin: '5px', padding: '8px' }} />
        <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} style={{ margin: '5px', padding: '8px' }} />
        <input placeholder="Téléphone" onChange={e => setForm({...form, telephone: e.target.value})} style={{ margin: '5px', padding: '8px' }} />
        <input placeholder="Permis de conduire" onChange={e => setForm({...form, permis_conduire: e.target.value})} style={{ margin: '5px', padding: '8px' }} />
        <button onClick={handleSubmit} style={{ margin: '5px', padding: '8px 15px', background: '#e94560', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Ajouter
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1a1a2e', color: 'white' }}>
            <th style={{ padding: '10px' }}>Nom</th>
            <th style={{ padding: '10px' }}>Prénom</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Téléphone</th>
            <th style={{ padding: '10px' }}>Permis</th>
            <th style={{ padding: '10px' }}>Sexe</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(c => (
            <tr key={c.id} style={{ borderBottom: '1px solid #ddd', textAlign: 'center' }}>
              <td style={{ padding: '10px' }}>{c.nom}</td>
              <td style={{ padding: '10px' }}>{c.prenom}</td>
              <td style={{ padding: '10px' }}>{c.email}</td>
              <td style={{ padding: '10px' }}>{c.telephone}</td>
              <td style={{ padding: '10px' }}>{c.permis_conduire}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clients;