var expect = require('chai').expect
  , supertest = require('supertest')
  , mongoose = require('mongoose')
  , app = require('../app')
  , User = require('../models/user')

var agent = supertest(app);

describe('sessions', function () {
  describe('GET /sessions/login', function (done) {
    var username = 'bob'
      , password = 's3cr3t';

    new User({
      username: username,
      email: 'bob@example.com',
      password: password,
      countryCode: '+1',
      phoneNumber: '555 5555'
    })
    .save()
      .then(function(user) {
        agent
          .post('/sessions/login')
          .send({ username, password })
          .expect(302, done);
      });
  });
});
