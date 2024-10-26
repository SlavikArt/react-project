import React from 'react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { loginWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      console.log('User logged in:', result.user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <button 
      onClick={handleLogin} 
      className="bg-blue-500 text-white p-2 rounded"
    >
      Login with Google
    </button>
  );
};

export default Login;
