import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function NavBar() {
  const { authUser, logout } = useAuth();
  const { carrito } = useCart();
  const navigate = useNavigate(); // Agrega esto

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={navStyle}>
      <div style={brandStyle}>☕ CaféExpress</div>

      {authUser && (
        <>
          {authUser.role === 'user' && (
            <>
              <Link style={linkStyle} to="/catalogo">Catálogo</Link>
              <Link style={linkStyle} to="/carrito">
                Carrito ({carrito.length})
              </Link>
            </>
          )}

          {authUser.role === 'admin' && (
            <Link style={linkStyle} to="/admin">Admin</Link>
          )}

          <span style={{ marginLeft: 'auto' }}>
            <button onClick={handleLogout}>Salir</button>
          </span>
        </>
      )}
    </nav>
  );
}

const navStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '.75rem 1.5rem',
  background: 'var(--brown-700)',
  color: 'var(--cream-100)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
};

const brandStyle = { fontWeight: 600, fontSize: '1.1rem' };
const linkStyle  = { color: 'var(--cream-100)', textDecoration: 'none' };

export default NavBar;

