var mongoose = require('mongoose');

var reservationSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  message:  { type: String, required: true },
  status:   { type: String, required: true },
  date:     { type: Date, default: Date.now },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'property'
  }
});

var reservation = mongoose.model('reservation', reservationSchema);

module.exports = reservation;
