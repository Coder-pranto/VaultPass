const router = require('express').Router();
const {
  register,
  verifyOTP,
  login,
  logout,
} = require('../controllers/authController.js');


router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
