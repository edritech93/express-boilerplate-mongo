const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Device = new Schema({
  token: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Device', Device);
