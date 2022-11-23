const Order = require('../models/order');
const Address = require('../models/address');
const Product = require('../models/product');
const Device = require('../models/device');
const User = require('../models/user');
const {sendNotification} = require('../services/notification');
const {validationResult} = require('express-validator');
const {ObjectId} = require('bson');

exports.createOrder = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  const objOrder = new Order({
    ...req.body,
    userId: req.user._id,
  });
  objOrder.save()
      .then((result) => {
        res.status(200).json({
          message: 'Pemesanan berhasil, silahkan menunggu diproses penjual',
          data: result,
        });
        _saveOrderToSeller(result);
      })
      .catch((error) => next(error));
};

exports.getOrder = (req, res, next) => {
  const {page, limit} = req.query;
  Order.find({userId: req.user._id})
      .skip(parseInt(limit * page, 10))
      .limit(parseInt(limit, 10))
      .sort({createdAt: -1})
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
};

exports.getOrderById = (req, res, next) => {
  const {orderId} = req.params;
  Order.aggregate([
    {
      $match: {
        _id: ObjectId(orderId),
      },
    },
    {
      $unwind: '$dataOrder',
    },
    {
      $addFields: {
        id_product: {
          $toObjectId: '$dataOrder.productId',
        },
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'id_product',
        foreignField: '_id',
        as: 'detailProduct',
      },
    },
  ])
      .then(async (result) => {
        const arrayOrder = result.map((e) => ({
          ...e.detailProduct[0],
          ...e.dataOrder,
        }));
        const addressId = result[0].addressId;
        const address = await Address.findById(addressId).catch(() => null);
        const sellerId = result[0].sellerId;
        const seller = await User.findOne({_id: sellerId}).catch(() => null);
        const body = {
          ...result[0],
          dataOrder: arrayOrder,
          detailProduct: [],
          address,
          seller,
        };
        res.status(200).json(body);
      })
      .catch((error) => next(error));
};


const _saveOrderToSeller = (data) => {
  const {dataOrder} = data;
  const arraySellerId = [];
  dataOrder.map(async (item, index) => {
    const {userId} = await Product.findOne({_id: item.productId});
    arraySellerId.push(userId);
    if (index === dataOrder.length - 1) {
      _addNotificationToSeller(arraySellerId);
    }
  });
};

const _addNotificationToSeller = (arraySellerId) => {
  // TODO: need exclude arraySellerId
  Device.findOne({userId: arraySellerId[0]}, function(error, device) {
    if (device) {
      const body = {
        token: device.token,
        title: 'Order',
        description: 'Ada Orderan masuk nih, cek segera ya!!',
        userId: device.userId,
        transaction_id: null,
        transaction_screen: 'Order',
      };
      sendNotification(body);
    }
  });
};

exports.editOrder = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  const {orderId} = req.params;
  Order.findById(orderId)
      .then((result) => {
        if (!result) {
          const err = new Error('Banner tidak ditemukan');
          err.status = 404;
          throw err;
        }
        const {name, description, attachment} = req.body;
        result.name = name;
        result.description = description;
        result.attachment = attachment;
        return result.save();
      })
      .then((result) => {
        res.status(200).json({
          message: 'Banner berhasil diubah',
          data: result,
        });
      })
      .catch((error) => next(error));
};

exports.deleteOrder = (req, res, next) => {
  const {orderId} = req.params;
  Order.findById(orderId)
      .then((result) => {
        if (!result) {
          const err = new Error('Pesanan tidak ditemukan');
          err.status = 404;
          throw err;
        }
        return Order.findByIdAndRemove(result._id);
      })
      .then((result) => {
        res.status(200).json({
          message: 'Pesanan berhasil dihapus',
          data: result,
        });
      })
      .catch((error) => next(error));
};
