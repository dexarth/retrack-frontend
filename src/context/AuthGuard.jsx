// components/AuthGuard.jsx
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthGuard = ({ children }) => {
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      window.location.href = `${import.meta.env.VITE_BASE_URL}/login`;
    }
  }, [token]);

  return token ? children : null; // Avoid rendering children until token is verified
};

export default AuthGuard;
