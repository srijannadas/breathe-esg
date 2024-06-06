import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { User, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
         // Redirect to the Home component if the user is logged in
      }
    });

    
    return () => unsubscribe();
  },);
  const handleLogout = async () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setUser(null); // Clear the user state
      // Redirect to the login page after logout
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };
  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName ? user.displayName : user.email}</p>
          {user.photoURL && <img src={user.photoURL} alt="Profile" />}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to={'/signup'} className='m-2 p-4 bg-green-500 text-white'>Sign Up</Link>
          <Link to={'/login'} className='m-2 p-4 bg-green-500 text-white'>Login</Link>
        </div>
      )}
    </div>
  )
}

export default Home
function logout() {
  throw new Error('Function not implemented.');
}

