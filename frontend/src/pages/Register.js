import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', password: '', confirm: '' });
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!form.username || !form.password || !form.confirm) {
      setNotification({ type: 'error', message: '⚠️ Remplis tous les champs !' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    if (form.password !== form.confirm) {
      setNotification({ type: 'error', message: '❌ Les mots de passe ne correspondent pas !' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    if (form.password.length < 6) {
      setNotification({ type: 'error', message: '❌ Le mot de passe doit avoir au moins 6 caractères !' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Récupérer les utilisateurs existants
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Vérifier si l'username existe déjà
    if (users.find(u => u.username === form.username)) {
      setNotification({ type: 'error', message: '❌ Ce nom d\'utilisateur existe déjà !' });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    // Ajouter le nouvel utilisateur
    users.push({ username: form.username, password: form.password });
    localStorage.setItem('users', JSON.stringify(users));

    setNotification({ type: 'success', message: '✅ Compte créé avec succès !' });
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: 'white',
        padding: '50px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '50px' }}>👤</div>
          <h2 style={{ color: '#1a1a2e', margin: '10px 0 5px' }}>Créer un compte</h2>
          <p style={{ color: '#666' }}>Renseignez les informations du nouvel utilisateur</p>
        </div>

        {notification && (
          <div style={{
            background: notification.type === 'success' ? '#d4edda' : '#f8d7da',
            color: notification.type === 'success' ? '#155724' : '#721c24',
            padding: '10px 15px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            {notification.message}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#1a1a2e', fontWeight: 'bold' }}>
            Nom d'utilisateur
          </label>
          <input
            type="text"
            placeholder="ex: jean123"
            value={form.username}
            onChange={e => setForm({...form, username: e.target.value})}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #eee',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#1a1a2e', fontWeight: 'bold' }}>
            Mot de passe
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #eee',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#1a1a2e', fontWeight: 'bold' }}>
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.confirm}
            onChange={e => setForm({...form, confirm: e.target.value})}
            onKeyPress={e => e.key === 'Enter' && handleSubmit()}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #eee',
              fontSize: '16px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '14px',
            background: '#e94560',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Créer le compte
        </button>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/login" style={{ color: '#e94560', textDecoration: 'none' }}>
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;