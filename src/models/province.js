const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Province = new Schema({
  provinceId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Province', Province);
