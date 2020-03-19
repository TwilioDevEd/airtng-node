var mongoose = require('mongoose');
exports.mongoConnection = mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = Promise;
