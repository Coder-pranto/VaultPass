import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return alert('Please fill all fields');
    }
    try {
      await API.post('/auth/login', { email, password });
      setTimeout(() => {
        alert('Login successful');
        navigate('/'); // dashboard
      }, 800);

    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Login</h2>

      <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder='Password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p>
        {'Don’t have an account?'} <Link to='/register'>Register</Link>
      </p>

      <p>
        Forgot password? <Link to='/forgot'>Reset</Link>
      </p>
    </div>
  );
}
