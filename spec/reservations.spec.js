require('./connectionHelper');
var app = require('../app.js');
var expect = require('chai').expect;
var supertest = require('supertest');
var xpath = require('xpath');
var dom = require('xmldom').DOMParser;
var proxyquire =  require('proxyquire')
var sinon = require('sinon');
var agent = supertest(app);

var Property = require('../models/property');
var Reservation = require('../models/reservation');
var User = require('../models/user');

var description = 'property';
var imageUrl = 'http://images.com/example.png';


describe('reservations', function () {
  after(function(done) {
    User.remove({})
      .then(function(){
        return Property.remove({})
      })
      .then(function() {
        Reservation.remove({}, done);
      });
  });

  beforeEach(function(done) {
    User.remove({})
      .then(function(){
        return Property.remove({})
      })
      .then(function() {
        Reservation.remove({}, done);
      });
  });

  describe('POST /reservations', function () {
    it ('creates a reservation', function () {
      var property = new Property({ description, imageUrl });
      var message = 'message';
      var reservation = new Reservation({message});
      return reservation.save()
        .then(function () {
          return property.save();
        })
        .then(function (savedProperty) {
          return agent
            .post('/reservations')
            .type('form')
            .send({
              message,
              propertyId: savedProperty.id
            });
        })
        .then(function (response) {
          expect(response.status).to.equal(302);
          return Reservation.findOne({});
        })
        .then(function(reservation) {
          expect(reservation.status).to.equal('pending');
          expect(reservation.message).to.equal(message);
        });
    });
  });

  describe('POST /reservations/handle', function () {
    it('creates a reservation and returns TwiML to send a text message', function () {
      // Stub Purchaser
      var purchaseStub = sinon.stub;
      purchaseStub.returns('phonenumber');
      var proxiedReservations = proxyquire('../routes/reservations',
        {'../lib/purchaser': {'purchase': purchaseStub}})
      var proxiedApp = proxyquire('../app', {'./routes/reservations': proxiedReservations})
      request = supertest(proxiedApp);

      var user = new User({
        username: 'username',
        email: 'bob@example.com',
        password: 'password',
        countryCode: '+1',
        phoneNumber: 'from'
      });

      var property = new Property({
        description: 'description',
        imageUrl: 'imageurl',
        owner: user._id});

      var reservation = new Reservation({
        message: 'message',
        property: property._id
      });

      return user.save()
        .then(function(user) {
          return property.save();
        })
        .then(function(property) {
          return reservation.save();
        })
        .then(function() {
          return request.post('/reservations/handle')
            .type('form')
            .send({
              From: 'from',
              Body: 'accept'
            });
        })
        .then(function (response) {
          var doc = new dom().parseFromString(response.text);
          var message = xpath.select('//Response/Message', doc)[0].firstChild.data;

          expect(response.status).to.equal(200);
          expect(message).to.equal('You have successfully confirmed the reservation')

          return Reservation.findOne({})
        })
        .then(function(reservation) {
          expect(reservation.status).to.equal('confirmed');
          expect(reservation.message).to.equal('message');
        });
    });
  });
});
