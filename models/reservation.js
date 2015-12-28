var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var reservationSchema = new mongoose.Schema({
  message:     { type: String, required: true },
  status:      { type: String, default: 'pending' },
  date:        { type: Date, default: Date.now },
  phoneNumber: { type: String }, // This is the anonymous phone number
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'property'
  },
  guest:     {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

reservationSchema.plugin(deepPopulate, {});

var reservation = mongoose.model('reservation', reservationSchema);

module.exports = reservation;
