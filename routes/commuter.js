var twilio = require('twilio');
var express = require('express');
var router = express.Router();
var Reservation = require('../models/reservation');

// POST: /commuter/use-sms
router.post('/use-sms', twilio.webhook({ validate: false }), function (req, res) {
  from = req.body.From;
  to   = req.body.To;
  body = req.body.Body;

  gatherOutgoingNumber(from, to)
  .then(function (outgoingPhoneNumber) {
    var twiml = new twilio.TwimlResponse();
    twiml.message(body, { to: outgoingPhoneNumber });

    res.type('text/xml');
    res.send(twiml);
  })
});

// POST: /commuter/use-voice
router.post('/use-voice', twilio.webhook({ validate: false }), function (req, res) {
  from = req.body.From;
  to   = req.body.To;
  body = req.body.Body;

  gatherOutgoingNumber(from, to)
  .then(function (outgoingPhoneNumber) {
    var twiml = new twilio.TwimlResponse();
    twiml.play('http://howtodocs.s3.amazonaws.com/howdy-tng.mp3');
    twiml.dial(outgoingPhoneNumber);

    res.type('text/xml');
    res.send(twiml);
  })
});

var gatherOutgoingNumber = function (incomingPhoneNumber, anonymousPhoneNumber) {
  var phoneNumber = anonymousPhoneNumber;

  return Reservation.findOne({ phoneNumber: phoneNumber })
  .deepPopulate('property property.owner guest')
  .then(function (reservation) {
    var hostPhoneNumber = formattedPhoneNumber(reservation.property.owner);
    var guestPhoneNumber = formattedPhoneNumber(reservation.guest);

    // Connect from Guest to Host
    if (guestPhoneNumber === incomingPhoneNumber) {
      outgoingPhoneNumber = hostPhoneNumber;
    }

    // Connect from Host to Guest
    if (hostPhoneNumber === incomingPhoneNumber) {
      outgoingPhoneNumber = guestPhoneNumber;
    }

    return outgoingPhoneNumber;
  })
  .catch(function (err) {
    console.log(err);
  });
}

var formattedPhoneNumber = function(user) {
  return "+" + user.countryCode + user.areaCode + user.phoneNumber;
};

module.exports = router;
