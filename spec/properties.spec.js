require('./connectionHelper');
var passport = require('passport');
var passportStub = require('passport-stub');
var expect = require('chai').expect;
var supertest = require('supertest');

var app = require('../app.js');
passportStub.install(app);

var Property = require('../models/property');
var User = require('../models/user');
var description = 'vacation-property';
var imageUrl = 'http://images.com/example.png';
var agent = supertest(app);

describe('properties', function () {
  after(function(done) {
    Property.remove({})
      .then(function () {
        User.remove({}, done);
      });
  });

  beforeEach(function(done) {
    passportStub.login({username: 'Bob'});
    Property.remove({})
      .then(function () {
        User.remove({}, done);
      });
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
            expect(property.imageUrl).to.equal(imageUrl);
          });
        })
        .expect(302, done);
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

  describe('POST /properties/update', function () {
    it('update a property', function (done) {
      var updatedDescription = 'updated-description';
      new Property({ description, imageUrl }).save()
        .then(function (savedProperty) {
          agent
            .post('/properties/update')
            .type('form')
            .send({
              propertyId: savedProperty.id,
              description: updatedDescription,
              imageUrl
            })
            .expect(function (response) {
              Property.findOne({}).then(function(property) {
                expect(property.imageUrl).to.equal(imageUrl);
              });
            })
            .expect(302, done);
        });
    });
  });
});

var user = new User({
  email: 'me@example.com',
  username: 'bob',
  password: 's3cr3t',
  countryCode: '+1',
  phoneNumber: '555-5555'
});

var authenticateUser = function() {
  user.save()
  .then(function () {
    agent
    .post('/sessions/login')
    .type('form')
    .send({
      username: user.username,
      password: user.password
    })
  });
}
