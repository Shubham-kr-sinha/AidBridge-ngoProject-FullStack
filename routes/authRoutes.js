const expres = require('express');
const router = expres.Router();
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimier');

router.post('/login', loginLimiter, authController.login)

router.post('/register', authController.register)

router.get('/profile', authController.getProfile)

module.exports = router;