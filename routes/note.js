const express = require('express');
const router = express.Router();
const passportConfig = require('../configs/passport.config');

const noteController = require('../controllers/note.controller');

router.get('/note/new', noteController.preCreate);
router.post('/note/new', passportConfig.isAuthenticated, noteController.create);
router.get('/note/:id', passportConfig.isAuthenticated, noteController.getOne);

module.exports = router;
