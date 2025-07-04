import { useState, useEffect } from 'react';

const empty = { username: '', password: '', role: 'user' };

function UserForm({ onSubmit, editable }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    editable ? setForm(editable) : setForm(empty);
  }, [editable]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.username || !form.password)
      return alert('Completa usuario y contraseña');
    onSubmit(form);
    setForm(empty);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <div className="mb-3">
        <label className="form-label">Usuario</label>
        <input
          type="text"
          name="username"
          className="form-control"
          placeholder="Usuario"
          value={form.username}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Rol</label>
        <select
          name="role"
          className="form-select"
          value={form.role}
          onChange={handleChange}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        {editable ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
}

export default UserForm;
