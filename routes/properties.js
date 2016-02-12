var express = require('express');
var router = express.Router();
var Property = require('../models/property');
var middleware = require('../lib/middleware');

router.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

// GET /properties
router.get('/', function (req, res) {
  Property.find().then(function (properties) {
    res.render('properties/index', { properties: properties });
  });
});

// GET /properties/new
router.get('/new', middleware.isAuthenticated, function (req, res) {
  Property.find().then(function (properties) {
    res.render('properties/new');
  });
});

// GET /properties/1
router.get('/:id', middleware.isAuthenticated, function (req, res) {
  var propertyId = req.params.id;
  Property.findOne({ _id: propertyId }).then(function (property) {
    res.render('properties/show', { property: property });
  });
});

// POST /properties
router.post('/', middleware.isAuthenticated, function (req, res) {
  var description = req.body.description;
  var imageUrl = req.body.imageUrl;
  var user = req.user;

  var property = new Property({ description: description, imageUrl: imageUrl, owner: user.id });
  property.save()
  .then(function (savedProperty) {
    res.redirect('/properties/' + savedProperty.id);
  });
});

// GET /properties/1/edit
router.get('/:id/edit', middleware.isAuthenticated, function (req, res) {
  var propertyId = req.params.id;
  Property.findOne({ _id: propertyId }).then(function (property) {
    res.render('properties/edit', { property: property });
  });
});

// POST /properties/update
router.post('/update', middleware.isAuthenticated, function (req, res) {
  var propertyId = req.body.propertyId;

  Property.findOne({ _id: propertyId })
  .then(function (property) {
    property.description = req.body.description;
    property.imageUrl = req.body.imageUrl;

    return property.save();
  })
  .then(function (updatedProperty) {
    return res.redirect('/properties/' + updatedProperty.id);
  });
});

module.exports = router;
