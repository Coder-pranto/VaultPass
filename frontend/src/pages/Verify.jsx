import { useState } from 'react';
import { verifyOtpAPI } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Verify() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      await verifyOtpAPI({ email, otp });
      alert('Verified!');
      navigate('/login');
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <input placeholder='email' onChange={(e) => setEmail(e.target.value)} />
      <input placeholder='OTP' onChange={(e) => setOtp(e.target.value)} />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}
