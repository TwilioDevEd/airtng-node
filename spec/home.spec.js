var expect = require('chai').expect;
var supertest = require('supertest');

var app = require('../app.js');

describe('home', function () {
  describe('GET /', function () {
    it('respond with ok', function (done) {
      var agent = supertest(app);
      agent
        .get('/')
        .expect(function (response) {
          expect(response.text).to.contain('captain');
        })
        .expect(200, done);
    });
  });
});
