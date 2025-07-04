import { createContext, useContext, useState } from 'react';
import { products as initialData } from '../data/products';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState(initialData);

  const addProduct = (prod) => {
    const nuevo = { ...prod, id: Date.now() };
    setProductos([...productos, nuevo]);
  };

  const updateProduct = (id, datos) => {
    setProductos(
      productos.map((p) => (p.id === id ? { ...p, ...datos } : p))
    );
  };

  const deleteProduct = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{ productos, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
