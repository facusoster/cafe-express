import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRole }) {
  const { authUser } = useAuth();

  if (!authUser) {
    // No está logueado
    return <Navigate to="/" />;
  }

  if (requiredRole && authUser.role !== requiredRole) {
    // Logueado, pero sin permisos
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
