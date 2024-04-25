// useCurrentUser.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // Вынесем вызов Cookies.get('token') в отдельную переменную
  const token = Cookies.get('token');

  useEffect(() => {
    if (!token) {
      setCurrentUser(null);
      return;
    }

    const getCurrentUser = async () => {
      const API_URL = 'http://localhost:8000/api/profile';
      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await axios.get(API_URL, { headers });
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Error getting current user:', error);
        setCurrentUser(null);
      }
    };

    getCurrentUser();
  }, [token]); // Используем переменную token в качестве зависимости

  return currentUser;
};

export default useCurrentUser;
