import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api';

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get('/auth/me');
        setIsAuth(true);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;

  return isAuth ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
