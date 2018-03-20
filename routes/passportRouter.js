const express = require('express');
const router = express.Router();
const passportConfig = require('../configs/passport.config');

const authController = require('../controllers/auth.controller');

router.get("/", authController.landingPage);

router.get('/signup', authController.preRegister);
router.get('/login', authController.preLogin);
router.get('/private', passportConfig.isAuthenticated, authController.private);

router.post('/login', authController.postLogin);
router.post('/signup', authController.postRegister);
router.post('/logout', passportConfig.isAuthenticated, authController.postLogout);

module.exports = router;
