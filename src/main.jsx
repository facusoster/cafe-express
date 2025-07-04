import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { UserProvider } from './context/UserContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap
import './styles/theme.css'; // Tus estilos personalizados

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
              <UserProvider>
                <App />
              </UserProvider>   {/* NUEVO */}
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);