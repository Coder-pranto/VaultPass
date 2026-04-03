import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useAuthContext();

  if (loading) return <p>Checking...</p>;

  return isAuth ? children : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
