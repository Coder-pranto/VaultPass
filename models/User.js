const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: String,
    otpExpire: Date,

    resetToken: String,
    resetTokenExpire: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
