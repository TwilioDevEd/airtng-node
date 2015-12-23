var expect = require('chai').expect
  , supertest = require('supertest')
  , mongoose = require('mongoose')
  , app = require('../app')

var agent = supertest(app);

describe('users', function () {
  describe('GET /users/new', function () {
    it('shows registration form', function (done) {
      agent
        .get('/users/new')
        .expect(function (res) {
        })
        .expect(200)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          expect(res.text).to.contain('Sign up');
          done();
        });
    });
  });

  describe('POST /users', function () {
    it('register a new user', function (done) {
      agent
        .post('/users')
        .send({
          username: 'bob',
          email: 'bob@example.com',
          password: 's3cr3t',
          countryCode: '+1',
          phoneNumber: '555 5555'
        })
        .expect(302)
        .end(function (err, res) {
          if (err) {
            return done(err);
          }

          done();
        });
    });
  });
});
