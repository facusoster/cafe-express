import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function CarritoPage() {
  const { carrito, quitarDelCarrito, vaciarCarrito, total } = useCart();
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');

  const handleFinalizar = () => {
    setMensaje('¡Tu compra fue realizada con éxito!');
    vaciarCarrito();
    setTimeout(() => {
      setMensaje('');
      navigate('/catalogo');
    }, 2500);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tu carrito</h2>

      {mensaje && (
        <div className="alert alert-success text-center" role="alert">
          {mensaje}
        </div>
      )}

      {carrito.length === 0 && !mensaje && (
        <div className="alert alert-info text-center">
          No hay productos aún.
        </div>
      )}

      {carrito.length > 0 && (
        <>
          <ul className="list-group mb-4">
            {carrito.map((p) => (
              <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{p.nombre}</strong> x {p.cantidad}
                  <span className="text-muted ms-2">(${p.precio} c/u)</span>
                </div>
                <div>
                  <span className="me-3 fw-bold">${p.precio * p.cantidad}</span>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => quitarDelCarrito(p.id)}
                  >
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h4>Total: <span className="fw-bold">${total}</span></h4>

          <button className="btn btn-success mt-3" onClick={handleFinalizar}>
            Finalizar compra
          </button>
        </>
      )}
    </div>
  );
}

export default CarritoPage;
