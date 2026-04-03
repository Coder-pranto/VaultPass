import { Link, useNavigate } from 'react-router-dom';
import { registerAPI } from '../api';
import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      return alert('Please fill all fields');
    }

    try {
      setLoading(true);

      await registerAPI({ email, password });

      setTimeout(() => {
        alert('OTP sent to email');
        navigate('/verify');
        setLoading(false);
      }, 800);
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>

      <input
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleRegister}
        disabled={loading}
        style={{
          background: loading ? '#999' : '#4CAF50',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>

      <p style={{ marginTop: '10px' }}>
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
}
