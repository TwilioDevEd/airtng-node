var express = require('express');
var router = express.Router();
var Property = require('../models/property');
var Reservation = require('../models/reservation');

router
  .post('/', function (req, res) {
    var propertyId = req.body.propertyId;

    Property.findOne({ _id: propertyId })
      .then(function (property) {
        var reservation = new Reservation({
          name: req.body.name,
          message: req.body.message,
          status: req.body.status,
          property: propertyId
        });

        reservation.save();
      });

      res.sendStatus(201);
  });

module.exports = router;
