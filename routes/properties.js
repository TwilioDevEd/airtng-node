var express = require('express');
var router = express.Router();
var Property = require('../models/property');

router
  .get('/', function (req, res) {
    Property.find().then(function (properties) {
      res.render('properties/index', { properties: properties });
    });
  })
  .post('/', function (req, res) {
    var description = req.body.description;
    var imageUrl = req.body.imageUrl;
    var property = new Property({ description, imageUrl });
    property.save();

    res.send('done');
  });

module.exports = router;
