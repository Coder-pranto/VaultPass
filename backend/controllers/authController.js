const {
  registerUser,
  verifyUserOTP,
  loginUser,
  userProfile,
  forgotPassword,
  resetPassword,
} = require('../services/authService.js');

// GET PROFILE
const getProfile = async (req, res) => {
  const data = await userProfile(req.user);
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
    sameSite: 'lax', // for development
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    
  });
  res.json({ user });
};

// LOGOUT
const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};

// FORGOT PASSWORD
const forgot = async (req, res) => {
  const { email } = req.body;
  const data = await forgotPassword(email);
  res.json(data);
};

// RESET PASSWORD
const reset = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const data = await resetPassword(token, password);
  res.json(data);
};

module.exports = {
  getProfile,
  register,
  verifyOTP,
  login,
  logout,
  forgot,
  reset,
};
