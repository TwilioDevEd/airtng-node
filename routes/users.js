var express = require('express');
var passport = require('passport');

var User = require('../models/user');

var router = express.Router();

// GET: /users/new
router.get('/new', function(req, res) {
  res.render('users/new');
});

// POST: /users
router.post('/', function(req, res) {
  User.register(new User({
    email:       req.body.email,
    username:    req.body.username,
    countryCode: req.body.countryCode,
    phoneNumber: req.body.phoneNumber
  }), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.send(user);
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

module.exports = router;
