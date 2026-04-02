import { useEffect, useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await API.get('/auth/me');
      setUser(res.data);
    } catch (error) {
      console.log(error);
      navigate('/login');
    }
  };

  fetchUser();
}, [navigate]);

  const logout = async () => {
    await API.post('/auth/logout');
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>

      {user ? <p>{user.email}</p> : <p>Loading...</p>}

      <button onClick={logout}>Logout</button>
    </div>
  );
}
