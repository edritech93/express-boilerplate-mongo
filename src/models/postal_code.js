const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostalCode = new Schema({
  postalId: {
    type: Number,
    required: true,
  },
  subDistrictName: {
    type: String,
    required: true,
  },
  districtId: {
    type: Number,
    required: true,
  },
  cityId: {
    type: Number,
    required: true,
  },
  provinceId: {
    type: Number,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('PostalCode', PostalCode);
