const Cart = require('../models/cart');
const {validationResult} = require('express-validator');

exports.createCart = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  const objCart = new Cart({
    ...req.body,
    userId: req.user._id,
  });
  objCart.save()
      .then((result) => {
        res.status(201).json({
          message: 'Keranjang berhasil ditambahkan',
          data: result,
        });
      }).catch((error) => next(error));
};

exports.getCart = (req, res, next) => {
  const {page, limit} = req.query;
  Cart.aggregate([
    {
      $match: {
        userId: req.user._id,
      },
    },
    {
      $addFields: {
        seller: {
          $toObjectId: '$sellerId',
        },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'seller',
        foreignField: '_id',
        as: 'seller',
      },
    },
    {
      $addFields: {
        product: {
          $toObjectId: '$productId',
        },
      },
    },
    {
      $lookup: {
        from: 'products',
        localField: 'product',
        foreignField: '_id',
        as: 'product',
      },
    },
  ])
      .skip(parseInt(limit * page, 10))
      .limit(parseInt(limit, 10))
      .sort({createdAt: -1})
      .then((result) => {
        const arrayResult = result.map((e) => ({
          ...e,
          seller: e.seller[0] ? e.seller[0] : null,
          name: e.product[0] ? e.product[0].name : null,
          description: e.product[0] ? e.product[0].description : null,
          attachment: e.product[0] ? e.product[0].attachment : null,
          product: null,
        }));
        res.status(200).json(arrayResult);
      })
      .catch((error) => next(error));
};

exports.editCart = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  const {productId} = req.params;
  Cart.findOne({productId: productId, userId: req.user._id})
      .then((result) => {
        if (!result) {
          const err = new Error('Produk tidak ditemukan di Keranjang');
          err.status = 404;
          throw err;
        }
        const {qty} = req.body;
        result.qty = qty;
        return result.save();
      })
      .then((result) => {
        res.status(200).json({
          message: 'Keranjang berhasil diubah',
          data: result,
        });
      })
      .catch((error) => next(error));
};

exports.deleteCart = (req, res, next) => {
  const {productId} = req.params;
  Cart.findOne({productId: productId, userId: req.user._id})
      .then((result) => {
        if (!result) {
          const err = new Error('Produk tidak ditemukan di Keranjang');
          err.status = 404;
          throw err;
        }
        return Cart.findByIdAndRemove(result._id);
      })
      .then((result) => {
        res.status(200).json({
          message: 'Produk berhasil dihapus dari keranjang',
          data: result,
        });
      })
      .catch((error) => next(error));
};

exports.deleteAllCart = (req, res, next) => {
  const userId = req.user._id;
  Cart.findOne({userId: userId})
      .then((result) => {
        if (!result) {
          const err = new Error('Keranjang tidak ditemukan');
          err.status = 404;
          throw err;
        }
        return Cart.deleteMany({userId: userId});
      })
      .then((result) => {
        res.status(200).json({
          message: 'Keranjang berhasil dihapus',
          data: result,
        });
      })
      .catch((error) => next(error));
};
