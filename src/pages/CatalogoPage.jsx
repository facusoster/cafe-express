import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { products } from '../data/products';
import ProductoCard from '../components/ProductoCard';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

function CatalogoPage() {
  const { authUser, logout } = useAuth();
  const { agregarAlCarrito } = useCart();
  const navigate = useNavigate();
  const { productos } = useProducts();

  const [mensaje, setMensaje] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/?logout=true');  
  };

  const handleAgregar = (producto) => {
    agregarAlCarrito(producto);
    setMensaje(`"${producto.nombre}" se añadió al carrito`);
  };

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => setMensaje(''), 2500);
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Bienvenido, {authUser?.username}</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/carrito')}>
            Ver carrito
          </button>
        </div>
      </div>

      {mensaje && (
        <div className="alert alert-success text-center" role="alert">
          {mensaje}
        </div>
      )}

      <div className="row g-4">
        {productos.map((prod) => (
          <div key={prod.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <ProductoCard producto={prod} onAgregar={handleAgregar} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatalogoPage;
