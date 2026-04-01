const router = require('express').Router();
const {
  register,
  verifyOTP,
  login,
  logout,
  forgot,
  reset,
  getProfile,
} = require('../controllers/authController.js');
const { protect } =  require('../middlewares/authMiddleware.js');

router.get('/me', protect, getProfile);
router.post('/register', register);
router.post('/verify-otp', verifyOTP);
router.post('/login', login);
router.post('/logout', logout);
router.post('/forgot-password', forgot);
router.post('/reset-password/:token', reset);

module.exports = router;
