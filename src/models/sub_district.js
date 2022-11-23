
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubDistrict = new Schema({
  subDistrictId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  districtId: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('SubDistrict', SubDistrict);
