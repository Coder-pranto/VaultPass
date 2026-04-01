import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return !!localStorage.getItem('chat-user');
};

const PublicRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to='/' />;
};

export default PublicRoute;
