import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './Login'; // Import your Login component

const UserProfile = () => {
  const { currentUser, logout } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      console.log('User logged out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 flex flex-col items-center" style={{ minHeight: '100vh', display: 'flex',
    justifyContent: 'center', }}>
      <h2 className="text-4xl font-bold mb-6">User Profile</h2>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        {user ? (
          <div className="flex items-center mb-4">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="User Photo"
                className="w-24 h-24 rounded-full mr-4"
              />
            )}
            <div>
              <p className="text-xl font-semibold">{user.displayName}</p>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-6">
            <p className="text-lg">You are not logged in. Please log in to access your profile.</p>
            <Login />
          </div>
        )}
        {user && (
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
