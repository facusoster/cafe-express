import { createContext, useContext, useState } from 'react';

// usuarios iniciales (puedes cambiarlos o empezar vacíos)
const initialUsers = [
  { id: 1, username: 'cliente', password: '1234', role: 'user' },
  { id: 2, username: 'admin',   password: 'admin123', role: 'admin' }
];

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(initialUsers);

  const addUser = (user) => {
    const nuevo = { ...user, id: Date.now() };
    setUsers([...users, nuevo]);
  };

  const updateUser = (id, data) => {
    setUsers(users.map(u => (u.id === id ? { ...u, ...data } : u)));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
