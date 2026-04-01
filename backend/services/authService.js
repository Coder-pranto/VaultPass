const crypto = require('crypto');
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const { generateOTP } = require('../utils/generateOTP.js');
const { sendEmail } = require('./emailService.js');
const { generateToken } = require('../utils/generateToken.js');

// 👤 PROFILE
const userProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error('User not found');
  return user;
};

// 🔐 REGISTER
const registerUser = async (email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = generateOTP();

  const user = await User.create({
    email,
    password: hashedPassword,
    otp,
    otpExpire: Date.now() + 5 * 60 * 1000, // 5 min
  });

  await sendEmail(email, 'OTP Verification', `Your OTP is ${otp}`);

  return { message: 'OTP sent to email' };
};

// 🔢 VERIFY OTP
const verifyUserOTP = async (email, otp) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error('User not found');

  if (user.otp !== otp) throw new Error('Invalid OTP');

  if (user.otpExpire < Date.now()) throw new Error('OTP expired');

  user.isVerified = true;
  user.otp = null;
  user.otpExpire = null;

  await user.save();

  return { message: 'Account verified' };
};

// 🔑 LOGIN
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  if (!user.isVerified) throw new Error('Please verify your account');

  const token = generateToken(user._id);

  return { token, user };
};

//🔑 FORGOT PASSWORD
const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error('User not found');

  // 1. Raw token (will be sent to the user)
  const resetToken = crypto.randomBytes(32).toString('hex');

  // 2. Hashed token (will be saved in the database)
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  user.resetToken = hashedToken;
  user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

  await user.save();
  //console.log('Reset token generated:', resetToken); // Debug log

  const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
  //const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`; //FOR PRODUCTION

  await sendEmail(email, 'Reset Password', `Click: ${resetLink}`);

  return { message: 'Reset link sent' };
};

//🔑 RESET PASSWORD
const resetPassword = async (token, newPassword) => {

  if (newPassword.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  // Hash the incoming token
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetToken: hashedToken,
    resetTokenExpire: { $gt: Date.now() },
  });

  if (!user) throw new Error('Invalid or expired token');

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.resetToken = null;
  user.resetTokenExpire = null;

  await user.save();

  return { message: 'Password reset successful' };
};

module.exports = {
  userProfile,
  registerUser,
  verifyUserOTP,
  loginUser,
  forgotPassword,
  resetPassword,
};
