import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return !!localStorage.getItem('chat-user');
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
