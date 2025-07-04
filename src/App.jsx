import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import CatalogoPage from './pages/CatalogoPage';
import CarritoPage from './pages/CarritoPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute'; // NUEVO

function App() {
  return (
    <>
      <NavBar /> {/* siempre visible */}

      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<LoginPage />} />

        {/* Rutas protegidas para USUARIO COMÚN */}
        <Route
          path="/catalogo"
          element={
            <ProtectedRoute requiredRole="user">
              <CatalogoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/carrito"
          element={
            <ProtectedRoute requiredRole="user">
              <CarritoPage />
            </ProtectedRoute>
          }
        />

        {/* Ruta protegida para ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
