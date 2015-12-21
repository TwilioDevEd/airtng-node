var express = require('express');
var passport = require('passport');

var User = require('../models/user');

var router = express.Router();

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  req.session.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
