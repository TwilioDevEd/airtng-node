var mongoose = require('mongoose');
exports.mongoConnection = mongoose.connect('mongodb://localhost/test');
mongoose.Promise = require('bluebird');
