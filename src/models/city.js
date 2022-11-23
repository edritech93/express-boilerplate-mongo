const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const City = new Schema({
  cityId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  provinceId: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('City', City);
