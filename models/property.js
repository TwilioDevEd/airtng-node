var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
  description: { type: String, required: true },
  imageUrl:    { type: String, required: true },
  date:        { type: Date, default: Date.now }
});

var property = mongoose.model('property', propertySchema);

module.exports = property;
