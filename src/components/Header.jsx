import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { currentUser, loginWithGoogle, logout } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recipes for All - React</h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/recipes/add" className="hover:underline">Add Recipe</Link>
            </li>
            <li>
              <Link to="/recipes" className="hover:underline">Recipes</Link>
            </li>
            {user ? (
              <li>
                <Link to="/profile" className="flex items-center">
                  <img src={user.photoURL} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                </Link>
              </li>
            ) : (
              <li>
                <button onClick={loginWithGoogle} className="hover:underline">Log in</button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
