const express = require('express');
const User = require('../models/user');
const Note = require('../models/note');
const passport = require('passport');


module.exports.preCreate = (req, res, next) => {
  return res.render("note/new")
}

module.exports.getAll = (req, res, next) => {
  Note.find({_author: req.user._id})
      .then(note => res.status(200).json(note))
      .catch(err => next(err));
}

module.exports.create = (req, res, next) => {
  // const note = Object.assign({}, req.body);
  const note = req.body;
  note._author = req.user._id;

  Note.create(note)
        .then(note => {
          return res.redirect("/private");
        })
        .catch(err => next(err));
}

module.exports.getOne = (req, res, next) => {
  Note.findOne({_id: req.params.id})
  .then(note => res.status(200).json(note))
  .catch(err => next(err));
}
