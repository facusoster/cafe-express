import { useState, useEffect } from 'react';

const initialState = { nombre: '', descripcion: '', precio: '', imagen: '' };

function ProductForm({ onSubmit, editable }) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editable) setForm(editable);
  }, [editable]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio) {
      setError('Nombre y precio son obligatorios');
      return;
    }

    setError('');
    onSubmit(form);
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: 400 }}>
      {error && (
        <div className="alert alert-warning text-center" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <input
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <input
          name="precio"
          type="number"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <input
          name="imagen"
          placeholder="URL de imagen"
          value={form.imagen}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        {editable ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
}

export default ProductForm;
