var mongoose = require('mongoose');
exports.mongoConnection = mongoose.connect('mongodb://localhost/test');

var expect = require('chai').expect;
var supertest = require('supertest');

var app = require('../app.js');

var Property = require('../models/property');
var description = 'vacation-property';
var imageUrl = 'http://images.com/example.png';
var agent = supertest(app);

describe('properties', function () {
  after(function(done) {
    Property.remove({}, done);
  });

  beforeEach(function(done) {
    Property.remove({}, done);
  });

  describe('GET /properties', function () {
    it('list all properties', function (done) {
      var property = new Property({ description, imageUrl });

      var result = property.save();
      result.then(function () {
        agent
          .get('/properties')
          .expect(function (response) {
            expect(response.text).to.contain(description);
            expect(response.text).to.contain(imageUrl);
          })
          .expect(200, done);
        });
    });
  });

  describe('GET /properties/new', function () {
    it('shows create property form', function (done) {
      agent
        .get('/properties/new')
        .expect(function (response) {
          expect(response.text).to.contain('New');
        })
        .expect(200, done);
    });
  });

  describe('POST /properties', function () {
    it('creates a property', function (done) {
      agent
        .post('/properties')
        .type('form')
        .send({
          description,
          imageUrl
        })
        .expect(function (response) {
          Property.findOne({}).then(function(property) {
            expect(property.description).to.equal(description);
            expect(property.imageUrl).to.equal(imageUrl);
          });
        })
        .expect(201, done);
    });
  });

  describe('GET /properties/:id', function () {
    it('shows a single property', function (done) {
      var property = new Property({ description, imageUrl });

      var result = property.save();
      result.then(function () {
        agent
          .get('/properties/' + property._id)
          .expect(function (response) {
            expect(response.text).to.contain(description);
            expect(response.text).to.contain(imageUrl);
          })
          .expect(200, done);
        });
    });
  });

  describe('GET /properties/:id/edit', function () {
    it('shows edit property form', function (done) {
      var property = new Property({ description, imageUrl });

      var result = property.save();
      result.then(function () {
        agent
          .get('/properties/' + property._id + '/edit')
          .expect(function (response) {
            expect(response.text).to.contain(description);
            expect(response.text).to.contain(imageUrl);
          })
          .expect(200, done);
        });
    });
  });

  describe('PUT /properties', function () {
    it('update a property', function (done) {
      var property = new Property({ description, imageUrl });
      var updatedDescription = 'updated-description';

      var result = property.save();
      result.then(function () {
        agent
          .put('/properties')
          .type('form')
          .send({
            description: updatedDescription,
            imageUrl
          })
          .expect(function (response) {
            Property.findOne({}).then(function(property) {
              expect(property.description).to.equal(updatedDescription);
              expect(property.imageUrl).to.equal(imageUrl);
            });
          })
          .expect(204, done);
        });
    });
  });
});
