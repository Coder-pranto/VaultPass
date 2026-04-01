import { useState } from 'react';
import API from '../api';

export default function Forgot() {
  const [email, setEmail] = useState('');

  const handle = async () => {
    try {
      await API.post('/auth/forgot-password', { email });
      alert('Check email!');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <input onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handle}>Send</button>
    </div>
  );
}
