const Product = require('../models/product');
const Category = require('../models/category');
const {validationResult} = require('express-validator');

exports.createProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  const objProduct = new Product({
    ...req.body,
    userId: req.user._id,
  });
  objProduct.save()
      .then((result) => {
        res.status(201).json({
          message: 'Produk berhasil ditambahkan',
          data: result,
        });
      }).catch((error) => next(error));
};

exports.getProductAll = (req, res, next) => {
  const {page, limit, categoryId, search} = req.query;
  let objFind = {};
  if (categoryId) {
    objFind = {...objFind, categoryId};
  }
  if (search) {
    const key = {
      $regex: search,
      $options: '$i',
    };
    objFind = {...objFind, name: key};
  }
  Product.aggregate([
    {$match: objFind},
    {$sort: {'createdAt': -1}},
    {$skip: parseInt(limit * page, 10)},
    {$limit: parseInt(limit, 10)},
    {$addFields: {
      userId: {$toObjectId: '$userId'},
    }},
    {$lookup: {
      from: 'users',
      localField: 'userId',
      foreignField: '_id',
      as: 'seller',
    }},
  ])
      .then((result) => {
        const arrayProduct = result?.map((e) => ({
          ...e,
          seller: e.seller ? e.seller[0] : null,
        })) ?? [];
        res.status(200).json(arrayProduct);
      })
      .catch((error) => next(error));
};

exports.getProductLatest = (req, res, next) => {
  const {page, limit} = req.query;
  Product.aggregate([
    {
      $match: {},
    },
    {
      $addFields: {
        userId: {
          $toObjectId: '$userId',
        },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'seller',
      },
    },
  ])
      .skip(parseInt(limit * page, 10))
      .limit(parseInt(limit, 10))
      .sort({createdAt: -1})
      .then((result) => {
        const arrayProduct = result?.map((e) => ({
          ...e,
          seller: e.seller ? e.seller[0] : null,
        })) ?? [];
        res.status(200).json(arrayProduct);
      }).catch((error) => next(error));
};

exports.editProduct = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  const {productId} = req.params;
  Product.findById(productId)
      .then((result) => {
        if (!result) {
          const err = new Error('Produk tidak ditemukan');
          err.status = 404;
          throw err;
        }
        const {name, description, price, categoryId, attachment} = req.body;
        result.name = name;
        result.description = description;
        result.price = price;
        result.categoryId = categoryId;
        result.attachment = attachment;
        return result.save();
      })
      .then((result) => {
        res.status(200).json({
          message: 'Produk berhasil diubah',
          data: result,
        });
      })
      .catch((error) => next(error));
};

exports.deleteProduct = (req, res, next) => {
  const {productId} = req.params;
  Product.findById(productId)
      .then((result) => {
        if (!result) {
          const err = new Error('Produk tidak ditemukan');
          err.status = 404;
          throw err;
        }
        return Product.findByIdAndRemove(result._id);
      })
      .then((result) => {
        res.status(200).json({
          message: 'Produk berhasil dihapus',
          data: result,
        });
      })
      .catch((error) => next(error));
};

exports.getProductById = (req, res, next) => {
  const {productId} = req.params;
  Product.findById(productId)
      .then((result) => {
        return Category.findOne({_id: result.categoryId});
      })
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
};

exports.productGetSeller = (req, res, next) => {
  const {page, limit} = req.query;
  Product.find({userId: req.user._id})
      .skip(parseInt(limit * page, 10))
      .limit(parseInt(limit, 10))
      .sort({createdAt: -1})
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
};
