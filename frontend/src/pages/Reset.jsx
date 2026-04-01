import { useState } from 'react';
import API from '../api';
import { useParams } from 'react-router-dom';

export default function Reset() {
  const { token } = useParams();
  const [password, setPassword] = useState('');

  const handle = async () => {
    try {
      await API.post(`/auth/reset-password/${token}`, { password });
      alert('Password updated!');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handle}>Reset</button>
    </div>
  );
}
