import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await API.post('/auth/logout');
    localStorage.removeItem('chat-user');
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
