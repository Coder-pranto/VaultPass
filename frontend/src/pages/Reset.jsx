import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPasswordAPI } from '../api';

export default function Reset() {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      await resetPasswordAPI({ token, password });
      alert('Password updated');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>

      <input
        type='password'
        placeholder='New password'
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
