import { useEffect, useState } from 'react';
import { fetchMe, logoutAPI } from '../api';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/useAuthContext';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const {checkAuth} = useAuthContext();
  const navigate = useNavigate();

useEffect(() => {
  const fetchUser = async () => {
    try {
      const { data } = await fetchMe();
      setUser(data);
    } catch (error) {
      console.log(error);
      navigate('/login');
    }
  };

  fetchUser();
}, [navigate]);

  const handleLogout = async () => {
    await logoutAPI();
    checkAuth(); // 👈 update auth state
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {user ? <p>{user.email}</p> : <p>Loading...</p>}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
