var express = require('express');
var router = express.Router();
var Property = require('../models/property');
var Reservation = require('../models/reservation');

// POST: /reservations
router.post('/', function (req, res) {
  var propertyId = req.body.propertyId;
  var user = req.user;

  Property.findOne({ _id: propertyId })
  .then(function (property) {
    var reservation = new Reservation({
      message: req.body.message,
      property: propertyId,
      guest: user.id
    });

    return reservation.save();
  }).then(function (savedReservation) {
    res.redirect('/properties');
  }).catch(function(err) {
    console.log(err);
  });
});

module.exports = router;
