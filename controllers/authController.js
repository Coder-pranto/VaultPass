const {
  registerUser,
  verifyUserOTP,
  loginUser,
  userProfile,
} = require('../services/authService.js');


// GET PROFILE
const getProfile = async (req, res) => {
      const data = await userProfile(req.user.id);
      res.json(data);
};

// REGISTER
const register = async (req, res) => {
  const { email, password } = req.body;
  const data = await registerUser(email, password);
  res.status(201).json(data);
};

// VERIFY OTP
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const data = await verifyUserOTP(email, otp);
  res.json(data);
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUser(email, password);
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    // secure: true,
    // sameSite: 'strict', // for production
  });
  res.json({ user , token});
};

// LOGOUT
const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

module.exports = { getProfile, register, verifyOTP, login, logout };
