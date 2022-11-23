const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const District = new Schema({
  districtId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cityId: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('District', District);
