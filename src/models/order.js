const mongoose = require('mongoose');
const {ORDER_STATUS} = require('../constants');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Order = new Schema({
  dataOrder: [
    {
      productId: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
    },
  ],
  totalOrder: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  addressId: {
    type: String,
    required: true,
  },
  sellerId: {
    type: String,
    required: true,
  },
  orderCode: {
    type: Number,
    default: 0,
  },
  orderStatus: {
    type: Object,
    default: ORDER_STATUS[0],
  },
}, {
  timestamps: true,
});

Order.plugin(AutoIncrement, {inc_field: 'orderCode'});
module.exports = mongoose.model('Order', Order);
