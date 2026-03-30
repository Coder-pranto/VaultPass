const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const { generateOTP } = require('../utils/generateOTP.js');
const { sendEmail } = require('./emailService.js');
const { generateToken } = require('../utils/generateToken.js');


// 👤 PROFILE
const userProfile = async (userId) => {
  const user = await User.findById(userId).select('-password');
    if (!user) throw new Error("User not found");
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
  console.log('User created:', user); // Debug log
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

module.exports = { userProfile, registerUser, verifyUserOTP, loginUser };