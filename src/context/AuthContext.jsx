import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');

    if (urlToken) {
      localStorage.setItem('authToken', urlToken);
      setToken(urlToken);
      window.history.replaceState({}, '', '/dashboard');
      navigate('/dashboard');
    } else {
      const savedToken = localStorage.getItem('authToken');
      if (savedToken) setToken(savedToken);
    }
  }, [navigate]);

  useEffect(() => {
    if (token && !role) {
      fetch(`${import.meta.env.VITE_BASE_URL}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (data?.role) {
            setRole(data.role);
          }
        })
        .catch(() => {
          // Optional: handle token expiration or unauthorized access
          setRole(null);
        });
    }
  }, [token, role]);

  return (
    <AuthContext.Provider value={{ token, setToken, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
