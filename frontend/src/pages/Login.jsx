import { Link, useNavigate } from 'react-router-dom';
import { loginAPI } from '../api';
import { useState } from 'react';
import { useAuthContext } from '../context/useAuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { checkAuth } = useAuthContext(); 
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return alert('Please fill all fields');
    }
    try {
       setLoading(true);
      await loginAPI({ email, password });
      setTimeout(() => {
        checkAuth(); // 👈 update auth state
        navigate('/'); // dashboard
        setLoading(false);
        alert('Login successful');
      }, 1500);

    } catch (err) {
      setLoading(false);
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

      <button
        onClick={handleLogin}
        disabled={loading}
        style={{
          background: loading ? '#999' : '#4CAF50',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Logging in...' : 'Login'} 
      </button>

      <p>
        {'Don’t have an account?'} <Link to='/register'>Register</Link>
      </p>

      <p>
        Forgot password? <Link to='/forgot'>Reset</Link>
      </p>
    </div>
  );
}
