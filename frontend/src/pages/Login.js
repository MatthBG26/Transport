import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = () => {
    const success = login(form.username, form.password);
    if (success) {
      navigate('/voitures');
    } else {
      setError('❌ Identifiants incorrects !');
      setTimeout(() => setError(null), 3000);
    }
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
          <div style={{ fontSize: '50px' }}>🚗</div>
          <h2 style={{ color: '#1a1a2e', margin: '10px 0 5px' }}>TransportPro</h2>
          <p style={{ color: '#666' }}>Connectez-vous pour accéder au dashboard</p>
        </div>

        {error && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '10px 15px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#1a1a2e', fontWeight: 'bold' }}>
            Nom d'utilisateur
          </label>
          <input
            type="text"
            placeholder="admin"
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

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#1a1a2e', fontWeight: 'bold' }}>
            Mot de passe
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
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
          Se connecter
        </button>

        <div style={{ textAlign: 'center', marginTop: '20px', color: '#999', fontSize: '14px' }}>
          Identifiants par défaut : admin / admin123
        </div>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <Link to="/register" style={{ color: '#e94560', textDecoration: 'none' }}>
            👤 Créer un nouveau compte
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;