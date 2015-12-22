var mongoose = require('mongoose');

var propertySchema = new mongoose.Schema({
  description: { type: String, required: true },
  imageUrl:    { type: String, required: true },
  date:        { type: Date, default: Date.now },
  owner:       {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

var property = mongoose.model('property', propertySchema);

module.exports = property;
