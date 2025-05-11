import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Logout = () => {
  const { setToken } = useAuth();

  useEffect(() => {
    localStorage.removeItem('authToken');
    setToken(null);

    window.location.href = `${import.meta.env.VITE_BASE_URL}/logout`;

    window.location.href = `${import.meta.env.VITE_BASE_URL}/login`;

  }, [setToken]);

  return null;
};

export default Logout;
