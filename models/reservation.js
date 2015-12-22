var mongoose = require('mongoose');

var reservationSchema = new mongoose.Schema({
  message:  { type: String, required: true },
  status:   { type: String, default: 'pending' },
  date:     { type: Date, default: Date.now },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'property'
  },
  guest:     {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

var reservation = mongoose.model('reservation', reservationSchema);

module.exports = reservation;
