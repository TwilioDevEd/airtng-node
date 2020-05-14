var config = require('../config');
var client = require('twilio')(config.accountSid, config.authToken);
var Reservation = require('../models/reservation');

var sendNotification = function() {
  Reservation.find({status: 'pending'})
  .deepPopulate('property property.owner guest')
  .then(function (reservations) {
    if (reservations.length > 1) {
      return;
    }

    var reservation = reservations[0];
    var owner = reservation.property.owner;

    // Send the notification
    client.messages.create({
      to: phoneNumber(owner),
      from: config.phoneNumber,
      body: buildMessage(reservation)
    })
    .then(function(res) {
      console.log(res.body);
    })
    .catch(function(err) {
      console.log(err);
    });
  });
};

var phoneNumber = function(owner) {
  return "+" + owner.countryCode + owner.phoneNumber;
};

var buildMessage = function(reservation) {
  var message = "You have a new reservation request from " + reservation.guest.username +
    " for " + reservation.property.description + ":\n" +
    reservation.message + "\n" +
    "Reply accept or reject";

  return message;
};

exports.sendNotification = sendNotification;
