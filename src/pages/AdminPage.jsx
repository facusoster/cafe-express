import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useUsers } from '../context/UserContext';
import ProductForm from '../components/ProductForm';
import UserForm from '../components/UserForm';

function AdminPage() {
  const { authUser, logout } = useAuth();
  const { productos, addProduct, updateProduct, deleteProduct } = useProducts();
  const { users, addUser, updateUser, deleteUser } = useUsers();

  const [tab, setTab] = useState('productos');
  const [editProduct, setEditProduct] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
  logout();
navigate('/?logout=true');
  };

  const handleSubmitProduct = (data) => {
    if (editProduct) {
      updateProduct(editProduct.id, data);
      setEditProduct(null);
    } else {
      addProduct({ ...data, precio: Number(data.precio) });
    }
  };

  const handleSubmitUser = (data) => {
    if (editUser) {
      updateUser(editUser.id, data);
      setEditUser(null);
    } else {
      addUser(data);
    }
  };

  return (
    <div className="container py-4">
      <div className="text-end">
        <button onClick={handleLogout} className="btn btn-outline-secondary mb-3">
          Cerrar sesión
        </button>
      </div>

      <h2 className="text-center mb-4">Panel de administración - {authUser.username}</h2>

      <div className="d-flex justify-content-center mb-4">
        <div className="btn-group" role="group">
          <button
            onClick={() => setTab('productos')}
            className={`btn ${tab === 'productos' ? 'btn-dark' : 'btn-outline-dark'}`}
          >
            Productos
          </button>
          <button
            onClick={() => setTab('usuarios')}
            className={`btn ${tab === 'usuarios' ? 'btn-dark' : 'btn-outline-dark'}`}
          >
            Usuarios
          </button>
        </div>
      </div>

      {tab === 'productos' && (
        <>
          <h4 className="mb-3 text-center">{editProduct ? 'Editar producto' : 'Agregar nuevo producto'}</h4>
          <ProductForm onSubmit={handleSubmitProduct} editable={editProduct} />

          <div className="table-responsive mt-4">
            <table className="table table-bordered align-middle">
              <thead className="table-dark text-center">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th colSpan="2">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {productos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.nombre}</td>
                    <td>${p.precio}</td>
                    <td>
                      <button onClick={() => setEditProduct(p)} className="btn btn-sm btn-warning">
                        Editar
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteProduct(p.id)} className="btn btn-sm btn-danger">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'usuarios' && (
        <>
          <h4 className="mb-3 text-center">{editUser ? 'Editar usuario' : 'Crear nuevo usuario'}</h4>
          <UserForm onSubmit={handleSubmitUser} editable={editUser} />

          <div className="table-responsive mt-4">
            <table className="table table-bordered align-middle">
              <thead className="table-dark text-center">
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Rol</th>
                  <th colSpan="2">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.username}</td>
                    <td>{u.role}</td>
                    <td>
                      <button onClick={() => setEditUser(u)} className="btn btn-sm btn-warning">
                        Editar
                      </button>
                    </td>
                    <td>
                      <button onClick={() => deleteUser(u.id)} className="btn btn-sm btn-danger">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminPage;
