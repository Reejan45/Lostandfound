'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoginAndFetchProfile = async () => {
      const isLoggedIn = localStorage.getItem('token');

      if (isLoggedIn) {
        try {
          setIsLoading(true);
          const response = await axios.get('/api/profile');
          setUser(response.data);
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setError(err);
        } finally {
          setIsLoading(false);
        }
      } else {
        window.location.href = '/login';
      }
    };

    checkLoginAndFetchProfile();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
        {isLoading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error.message}</p>}
        {!isLoading && !error && !user && (
          <p className="text-center">User not found.</p>
        )}
        {!isLoading && !error && user && (
          <div>
            <h1 className="text-2xl font-bold mb-4">{user.name}</h1>
            <p className="text-gray-600">Email: {user.email}</p>
            {/* Add additional user profile information as needed */}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
