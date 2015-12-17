var express = require('express');
var router = express.Router();
var Property = require('../models/property');

router
  .get('/', function (req, res) {
    Property.find().then(function (properties) {
      res.render('properties/index', { properties });
    });
  })
  .get('/new', function (req, res) {
    Property.find().then(function (properties) {
      res.render('properties/new');
    });
  })
  .get('/:id', function (req, res) {
    var propertyId = req.params.id;
    Property.findOne({ _id: propertyId }).then(function (property) {
      res.render('properties/show', { property });
    });
  })
  .post('/', function (req, res) {
    var description = req.body.description;
    var imageUrl = req.body.imageUrl;

    var property = new Property({ description, imageUrl });
    property.save()
      .then(function (savedProperty) {
        res.redirect('/properties/' + savedProperty.id);
      });
  })
  .get('/:id/edit', function (req, res) {
    var propertyId = req.params.id;
    Property.findOne({ _id: propertyId }).then(function (property) {
      res.render('properties/edit', { property });
    });
  })
  .post('/update', function (req, res) {
    var id = req.body.propertyId;
    var description = req.body.description;
    var imageUrl = req.body.imageUrl;

    var property = new Property({ description, imageUrl });
    property.save()
      .then(function (savedProperty) {
        res.redirect('/properties/' + savedProperty.id);
      });
  });

module.exports = router;
