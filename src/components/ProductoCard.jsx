function ProductoCard({ producto, onAgregar }) {
    return (
      <div style={cardStyle}>
        <img src={producto.imagen} alt={producto.nombre} style={{ width: '100%', borderRadius: '8px' }} />
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
        <strong>${producto.precio}</strong><br />
        <button onClick={() => onAgregar(producto)}>Agregar al carrito</button>
      </div>
    );
  }
  
  const cardStyle = {
    background: 'var(--cream-200)',
    borderRadius: '10px',
    padding: '1rem',
    width: '260px',
    boxShadow: '0 4px 10px rgba(0,0,0,.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };
  
  
  export default ProductoCard;
  