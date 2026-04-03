import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext.jsx';
import { fetchMe } from '../api';

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const { data } = await fetchMe();
      setIsAuth(true);
      setUser(data);
    } catch (err) {
      if (err.response?.status !== 401) {
        console.error(err);
      }
      setIsAuth(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, loading, user, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
