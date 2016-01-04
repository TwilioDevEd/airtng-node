var twilio = require('twilio');
var express = require('express');
var router = express.Router();
var Property = require('../models/property');
var Reservation = require('../models/reservation');
var User = require('../models/user');
var notifier = require('../lib/notifier');
var purchaser = require('../lib/purchaser');

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
  })
  .then(function () {
    notifier.sendNotification();
    res.redirect('/properties');
  })
  .catch(function(err) {
    console.log(err);
  });
});

// POST: /reservations/handle
router.post('/handle', twilio.webhook({validate: false}), function (req, res) {
  var from = req.body.From;
  var smsRequest = req.body.Body;

  var smsResponse;

  User.findOne({phoneNumber: from})
  .then(function (host) {
    return Reservation.findOne({status: 'pending'})
    .deepPopulate('property property.owner guest')
  })
  .then(function (reservation) {
    if (reservation === null) {
      throw 'No pending reservations';
    }

    var hostAreaCode = reservation.property.owner.areaCode;

    var phoneNumber = purchaser.purchase(hostAreaCode);
    var reservationPromise = Promise.resolve(reservation);

    return Promise.all([phoneNumber, reservationPromise]);
  })
  .then(function (data) {
    var phoneNumber = data[0];
    var reservation = data[1];

    if (isSmsRequestAccepted(smsRequest)) {
      reservation.status = "confirmed";
      reservation.phoneNumber = phoneNumber;
    } else {
      reservation.status = "rejected";
    }
    return reservation.save();
  })
  .then(function (reservation) {
    var message = "You have successfully " + reservation.status + " the reservation";
    respond(res, message);
  })
  .catch(function (err) {
    console.log(err);
    var message = "Sorry, it looks like you do not have any reservations to respond to";
    respond(res, message);
  });
});

var isSmsRequestAccepted = function (smsRequest) {
  return smsRequest.toLowerCase() === 'accept';
};

var respond = function(res, message) {
  var twiml = new twilio.TwimlResponse();
  twiml.message(message);

  res.type('text/xml');
  res.send(twiml);
}

module.exports = router;
