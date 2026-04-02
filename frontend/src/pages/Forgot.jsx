import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Forgot() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgot = async () => {
    if (!email) return alert('Please enter email');

    try {
      setLoading(true);

      await API.post('/auth/forgot-password', { email });

      setTimeout(() => {
        alert('Reset link sent to email');
        setLoading(false);
        navigate('/login');
      }, 800);
    } catch (err) {
      setLoading(false);
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Forgot Password</h2>

      <input
        placeholder='Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleForgot}
        disabled={loading}
        style={{
          background: loading ? '#999' : '#4CAF50',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>
    </div>
  );
}
