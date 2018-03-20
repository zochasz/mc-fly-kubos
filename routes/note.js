const express = require('express');
const router = express.Router();
const passportConfig = require('../configs/passport.config');

const noteController = require('../controllers/note.controller');
const authController = require('../controllers/auth.controller');
// router.get('/logout', passportConfig.isAuthenticated, authController.postLogout);

router.get('/note/new', noteController.preCreate);
router.post('/note/new', passportConfig.isAuthenticated, noteController.create);
router.get('/note/favorite', passportConfig.isAuthenticated, noteController.getAll);
router.get('/note/favorite/:id', passportConfig.isAuthenticated, noteController.update);
router.get('/note/:id', passportConfig.isAuthenticated, noteController.getOne);

module.exports = router;
