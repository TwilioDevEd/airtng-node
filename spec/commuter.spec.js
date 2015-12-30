require('./connectionHelper');
var fixtures = require('./fixtures');

var expect = require('chai').expect;
var supertest = require('supertest');
var cheerio = require('cheerio');

var app = require('../app.js');
var User = require('../models/user');
var Reservation = require('../models/reservation');
var Property = require('../models/property');
var agent = supertest(app);

describe('commuter', function () {
  describe('POST /commuter/use-sms', function () {
    beforeEach(function (done) {
      new User(fixtures.host).save()
      .then(function (owner) {
        return new Property({
          description: 'Papallacta',
          imageUrl: 'http://image.info',
          owner: owner.id
        }).save();
      })
      .then(function (property) {
        var propertyPromise = Promise.resolve(property);
        var guestPromise =  new User(fixtures.guest).save();

        return Promise.all([propertyPromise, guestPromise]);
      })
      .then(function (data) {
        property = data[0];
        guest = data[1];
        new Reservation({
          message: 'reservation',
          property: property.id,
          guest: guest.id,
          phoneNumber: '+555 0000'
        }).save(done);
      })
      .catch(function (err) {
        console.log(err);
      });
    });

    afterEach(function (done) {
      Reservation.remove({})
      .then(function () {
        Property.remove({});
      })
      .then(function () {
        User.remove({}, done);
      });
    });

    context('when the user sends an SMS', function () {
      context('when the sender is the guest', function () {
        it('connects the guest to the host', function (done) {
          // Create a user for guest
          agent.post('/commuter/use-sms')
          .send({
            From: '555 5556',
            To:   '555 0000',
            Body: 'awesome message'
          })
          .expect(200)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            var $ = cheerio.load(res.text);
            expect($('Message').attr('to')).to.equal('555 5555');
            done();
          });
        });
      });

      context('when the sender is the host', function () {
        it('connects the host to the guest', function (done) {
          // Create a user for guest
          agent.post('/commuter/use-sms')
          .send({
            From: '555 5555',
            To:   '555 0000',
            Body: 'awesome message'
          })
          .expect(200)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            var $ = cheerio.load(res.text);
            expect($('Message').attr('to')).to.equal('555 5556');
            done();
          });
        });
      });
    });


    context('when the user make a call', function () {
      context('when the caller is the guest', function () {
        it('connects the guest to the host', function (done) {
          // Create a user for guest
          agent.post('/commuter/use-voice')
          .send({
            From: '555 5556',
            To:   '555 0000',
            Body: ''
          })
          .expect(200)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            var $ = cheerio.load(res.text);
            expect($('Dial').first().text()).to.equal('555 5555');
            done();
          });
        });
      });

      context('when the caller is the host', function () {
        it('connects the host to the guest', function (done) {
          // Create a user for guest
          agent.post('/commuter/use-voice')
          .send({
            From: '555 5555',
            To:   '555 0000',
            Body: ''
          })
          .expect(200)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            var $ = cheerio.load(res.text);
            expect($('Dial').first().text()).to.equal('555 5556');
            done();
          });
        });
      });
    });
  });
});
