const express = require('express');
const authRoutes = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

authRoutes.get("/", (req, res, next) => {
  res.render("auth/signup"), { "message": req.flash("error") });
});

authRoutes.post("/", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("private", { user: req.user });
});

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;
