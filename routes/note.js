const express = require('express');
const router = express.Router();

const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const Note = require('../models/note');
const User = require('../models/user');
require("dotenv").config();

const moment = require('moment');

router.get('/new', ensureLoggedIn('/'), (req, res, next) => {
      res.render('note/new');
});

router.post('/new', ensureLoggedIn('/'), (req, res, next) => {
  const _author = req.user._id;
  const { title, text } = req.body;

  const newNote = new Note({
      _author,
      title,
      text
  });
  newNote.save( (err) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        return res.redirect('/private-page');
      }
  });
  console.log("next", next);
});

router.get('/:id', (req, res, next) => {

});

router.post("/:id/delete", ensureLoggedIn('/'), (req, res, next) => {

  const eventId = req.params.id;
  const userId = req.user._id;

  User.findById(userId, (err, user) => {
      if (err) { return next (err); }
      var index = user._events.indexOf(eventId);
      if (index > -1) {
          user._events.splice(index, 1);
      }
      user.save( res.redirect('/event/calendar'));

    });
});

module.exports = router;
