const express = require('express');
const User = require('../models/user');
const Note = require('../models/note');
const passport = require('passport');

module.exports.landingPage = (req, res, next) => {
  let user = null;
  return res.render("index", {user})
}

module.exports.preRegister = (req, res, next) => {
  let user = null;
  return res.render("passport/signup", {user})
}

module.exports.preLogin = (req, res, next) => {
  let user = null;
  return res.render("passport/login", {user})
}
module.exports.postLogin = (req, res, next) =>  {
    const username = req.body.username;
    const password = req.body.password;
    const message1 = 'Username and password are required'
    const message2 = 'Username or password is invalid'
    let user = res.req.user

    if (!username || !password) {
      return res.render("passport/login", { message1, user });
    } else {
        passport.authenticate('local-auth', (err, user, message) => {
            if (err) { return next(err) }
            else if (!user) { return res.render("passport/login", { message2, user });
            } else {
                req.login(user, (err) => {
                    if (err) { return next(err)
                    } else {
                      return res.redirect("/private");
                    }
                });
            }
        })(req, res, next);
    }
}
module.exports.private = (req, res, next) => {
  let user = res.req.user
  Note.find()
        .populate('_author')
        .then(notes => res.render("passport/private", { user, notes }))
        .catch(err => next(err));
}

module.exports.postLogout = (req, res, next) => {
    req.logout();
    req.session.destroy(function (err) {
        if (err) { return next(err); }
        return res.redirect('/login');
    });
}

module.exports.postRegister = (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });

    if (!user.username || !user.password) {
      console.log('Username and password are required');
      return res.render("/signup");
    } else {
        User.findOne({ username: user.username }, (err, exist) => {
            if (err) { return next(err) }
            else if (exist) {
              console.log('Username unavailable');
              return res.render("/signup");
            } else {
                user.save((err) => {
                    if (err) { return next(err) }
                    else {
                        req.login(user, (err) => {
                            if (err) { return next(err) }
                            else {
                              console.log(req.user);
                              return res.redirect("/login");
                            }
                        });
                    }
                });
            }
        });
    }
}
