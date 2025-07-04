import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [logoutMsg, setLogoutMsg] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('logout') === 'true') {
      setLogoutMsg('Se ha cerrado la sesión');
      setTimeout(() => {
        setLogoutMsg('');
        navigate('/', { replace: true }); // elimina ?logout=true de la URL
      }, 2500);
    }
  }, [location.search, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (success) {
      const role = username === 'admin' ? 'admin' : 'user';
      navigate(role === 'admin' ? '/admin' : '/catalogo');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="mb-4 text-center">Iniciar sesión</h2>

        {logoutMsg && (
          <div className="alert alert-info text-center" role="alert">
            {logoutMsg}
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Usuario"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              placeholder="Contraseña"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
