const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Banner = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attachment: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Banner', Banner);
