import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post('/auth/register', { email, password });

      alert('OTP sent to email');
      navigate('/verify');
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      <input
        placeholder='Password'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>

      <p>
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
}
