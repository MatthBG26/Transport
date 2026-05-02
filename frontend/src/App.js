import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Voitures from './pages/Voitures';
import Clients from './pages/Clients';
import Locations from './pages/Locations';
import Login from './pages/Login';
import Register from './pages/Register';

function ProtectedRoute({ children, adminOnly }) {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;
  return children;
}

function Navbar() {
  const location = useLocation();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const navLinks = [
    { path: '/', label: '🏠 Accueil' },
    { path: '/voitures', label: '🚗 Voitures' },
    { path: '/clients', label: '👤 Clients' },
    { path: '/locations', label: '📋 Locations' },
  ];

  return (
    <nav style={{
      background: '#1a1a2e',
      padding: '0 30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <span style={{ color: '#e94560', fontWeight: 'bold', fontSize: '20px', padding: '15px 0' }}>
        🚗 TransportPro
      </span>
      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              color: location.pathname === link.path ? '#e94560' : '#a8b2d8',
              textDecoration: 'none',
              padding: '20px 15px',
              borderBottom: location.pathname === link.path ? '3px solid #e94560' : '3px solid transparent',
              fontWeight: location.pathname === link.path ? 'bold' : 'normal',
            }}
          >
            {link.label}
          </Link>
        ))}

        {/* Icône bonhomme pour créer un compte - admin seulement */}
        {isAdmin && (
          <Link
            to="/register"
            title="Créer un compte"
            style={{
              marginLeft: '10px',
              fontSize: '22px',
              textDecoration: 'none',
              padding: '5px 10px',
              borderRadius: '50%',
              background: location.pathname === '/register' ? '#e94560' : 'transparent',
              transition: 'all 0.2s'
            }}
          >
            👤
          </Link>
        )}

        {isAuthenticated ? (
          <button
            onClick={logout}
            style={{
              marginLeft: '10px',
              padding: '8px 16px',
              background: '#e94560',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            🚪 Déconnexion
          </button>
        ) : (
          <Link to="/login" style={{
            marginLeft: '15px',
            padding: '8px 16px',
            background: '#e94560',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px',
            fontWeight: 'bold'
          }}>
            🔐 Connexion
          </Link>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={
            <ProtectedRoute adminOnly={true}>
              <Register />
            </ProtectedRoute>
          } />
          <Route path="/voitures" element={<ProtectedRoute><Voitures /></ProtectedRoute>} />
          <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
          <Route path="/locations" element={<ProtectedRoute><Locations /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;