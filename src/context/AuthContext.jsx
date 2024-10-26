import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = AuthService.getCurrentUser((user) => {
      setCurrentUser(user); // Update the current user state
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      await AuthService.loginWithGoogle();
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
