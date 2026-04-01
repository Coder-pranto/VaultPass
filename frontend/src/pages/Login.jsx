import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await API.post('/auth/login', { email, password });

      localStorage.setItem('chat-user', JSON.stringify(data.user));

      navigate('/'); // 🔥 redirect dashboard
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder='Password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        Don’t have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  );
}
