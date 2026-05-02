import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [visits, setVisits] = useState(0);

  useEffect(() => {
    const count = parseInt(localStorage.getItem('visits') || '0') + 1;
    localStorage.setItem('visits', count);
    setVisits(count);
  }, []);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: 'white',
        padding: '80px 40px',
        textAlign: 'center',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🚗</div>
        <h1 style={{ fontSize: '48px', margin: '0 0 20px', color: '#e94560' }}>
          Transport Dashboard
        </h1>
        <p style={{ fontSize: '20px', color: '#a8b2d8', maxWidth: '600px', lineHeight: '1.6' }}>
          Gérez votre flotte de voitures, vos clients et vos locations en toute simplicité.
        </p>
        <div style={{ display: 'flex', gap: '15px', marginTop: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/voitures" style={{
            padding: '15px 30px',
            background: '#e94560',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            🚗 Voir les voitures
          </Link>
          <Link to="/locations" style={{
            padding: '15px 30px',
            background: 'transparent',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            border: '2px solid white'
          }}>
            📋 Gérer les locations
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        padding: '50px 40px',
        background: '#f8f9fa',
        flexWrap: 'wrap'
      }}>
        <div style={{ textAlign: 'center', background: 'white', padding: '30px 40px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', minWidth: '150px' }}>
          <div style={{ fontSize: '40px' }}>👁️</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#e94560' }}>{visits}</div>
          <div style={{ color: '#666', marginTop: '5px' }}>Visites</div>
        </div>
        <div style={{ textAlign: 'center', background: 'white', padding: '30px 40px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', minWidth: '150px' }}>
          <div style={{ fontSize: '40px' }}>🚗</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#e94560' }}>∞</div>
          <div style={{ color: '#666', marginTop: '5px' }}>Voitures</div>
        </div>
        <div style={{ textAlign: 'center', background: 'white', padding: '30px 40px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', minWidth: '150px' }}>
          <div style={{ fontSize: '40px' }}>👤</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#e94560' }}>∞</div>
          <div style={{ color: '#666', marginTop: '5px' }}>Clients</div>
        </div>
        <div style={{ textAlign: 'center', background: 'white', padding: '30px 40px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', minWidth: '150px' }}>
          <div style={{ fontSize: '40px' }}>📋</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#e94560' }}>∞</div>
          <div style={{ color: '#666', marginTop: '5px' }}>Locations</div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ padding: '50px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '40px', color: '#1a1a2e' }}>Fonctionnalités</h2>
        <div style={{ display: 'flex', gap: '25px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: '🚗', title: 'Gestion des voitures', desc: 'Ajoutez, modifiez et suivez le statut de chaque véhicule de votre flotte.' },
            { icon: '👤', title: 'Gestion des clients', desc: 'Gérez vos clients et leurs informations en un seul endroit.' },
            { icon: '📋', title: 'Gestion des locations', desc: 'Créez et suivez toutes vos locations avec calcul automatique du montant.' },
          ].map((f, i) => (
            <div key={i} style={{
              background: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              maxWidth: '280px',
              border: '1px solid #eee'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>{f.icon}</div>
              <h3 style={{ color: '#1a1a2e', marginBottom: '10px' }}>{f.title}</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#1a1a2e', color: '#a8b2d8', textAlign: 'center', padding: '20px' }}>
        © 2026 Transport Dashboard — Tous droits réservés
      </div>
    </div>
  );
}

export default Home;