import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const initializeUser = () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedUser = parseJwt(token);
        setUser(decodedUser);
        setIsAdmin(decodedUser?.isAdmin || false);
      }
    };
    initializeUser();
  }, []);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    const decodedUser = parseJwt(token);
    setUser(decodedUser);
    setIsAdmin(decodedUser?.isAdmin || false);
  };

  const logout = (navigate) => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAdmin(false);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
