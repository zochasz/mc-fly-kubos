const express = require('express');
const User = require('../models/user');
const Note = require('../models/note');
const passport = require('passport');


module.exports.preCreate = (req, res, next) => {
  let user = req.user;
  return res.render("note/new", {user})
}

module.exports.getAll = (req, res, next) => {
  let user = req.user;
  Note.find({_favorite: req.user._id})
      .then(notes => {
        return res.render("note/favorite", {notes, user})
      })
      .catch(err => next(err));
}

module.exports.create = (req, res, next) => {
  const note = req.body;
  note._author = req.user._id;
  note._authorName = req.user.username
  Note.create(note)
        .then(note => {
          return res.redirect("/private");
        })
        .catch(err => next(err));
}

module.exports.getOne = (req, res, next) => {
  let user = req.user;
  Note.findOne({_id: req.params.id})
  .then(note => {
    return res.render("note/view", {note, user})
  })
  .catch(err => next(err));
}
module.exports.update = (req, res, next) => {
  let user = req.user;
  let noteUpdated;

  Note.findOne({_id: req.params.id})
  .then(note => {
    let userID = req.user._id;
    noteUpdated = note;
    noteUpdated._favorite.push(userID);
    console.log('noteUpdated', noteUpdated)

    Note.findByIdAndUpdate({_id: req.params.id}, noteUpdated, {new: true})
    .then(note => {
      console.log('note returned', note)
      return res.redirect("/private")
    })
    .catch(err => next(err));
   })
  .catch(err => next(err));
}
