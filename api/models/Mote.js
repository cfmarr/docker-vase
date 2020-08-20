const mongoose = require('mongoose');

const MoteSchema = mongoose.Schema({
  moteId: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  siteId: {
    type: String,
    required: true,
  },
  statusId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = mongoose.model('Mote', MoteSchema);
