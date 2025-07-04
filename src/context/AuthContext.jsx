import { createContext, useContext, useState } from 'react';
import { users } from '../data/users';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  const login = (username, password) => {
    const user = users.find(
      u => u.username === username && u.password === password
    );
    if (user) {
      setAuthUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
