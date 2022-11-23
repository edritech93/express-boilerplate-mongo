const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Address = new Schema({
  typeId: {
    type: Number,
    required: true,
  },
  provinceId: {
    type: Number,
    required: true,
  },
  cityId: {
    type: Number,
    required: true,
  },
  districtId: {
    type: Number,
    required: true,
  },
  subDistrictId: {
    type: Number,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
  },
  addressDetail: {
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

module.exports = mongoose.model('Address', Address);
