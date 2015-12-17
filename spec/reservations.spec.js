require('./connectionHelper');
var expect = require('chai').expect;
var supertest = require('supertest');

var app = require('../app.js');

var Property = require('../models/property');
var Reservation = require('../models/reservation');
var description = 'property';
var imageUrl = 'http://images.com/example.png';
var agent = supertest(app);

describe('reservations', function () {
  after(function(done) {
    Property.remove({});
    Reservation.remove({});
    done();
  });

  beforeEach(function(done) {
    Property.remove({});
    Reservation.remove({});
    done();
  });

  describe('POST /reservations', function () {
    it ('creates a reservation', function (done) {
      var property = new Property({ description, imageUrl });
      var name = 'name';
      var message = 'message';
      var status = 'pending';

      property.save()
        .then(function (savedProperty) {
          agent
          .post('/reservations')
          .type('form')
          .send({
            name,
            message,
            status,
            propertyId: savedProperty.id
          })
          .expect(function (response) {
            Reservation.findOne({}).then(function(reservation) {
              expect(reservation.name).to.equal(name);
              expect(reservation.status).to.equal(status);
            });
          })
          .expect(201, done);
        });
    });
  });
});
