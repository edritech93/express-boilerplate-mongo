const Banner = require('../models/banner');
const {validationResult} = require('express-validator');

exports.createBanner = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  const objBanner = new Banner(req.body);
  objBanner.save()
      .then((result) => {
        res.status(201).json({
          message: 'Banner berhasil ditambahkan',
          data: result,
        });
      }).catch((error) => next(error));
};

exports.getBanner = (req, res, next) => {
  const {page, limit} = req.query;
  Banner.find()
      .skip(parseInt(limit * page, 10))
      .limit(parseInt(limit, 10))
      .sort({createdAt: -1})
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
};

exports.editBanner = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  const {bannerId} = req.params;
  Banner.findById(bannerId)
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

exports.deleteBanner = (req, res, next) => {
  const {bannerId} = req.params;
  Banner.findById(bannerId)
      .then((result) => {
        if (!result) {
          const err = new Error('Banner tidak ditemukan');
          err.status = 404;
          throw err;
        }
        return Banner.findByIdAndRemove(result._id);
      })
      .then((result) => {
        res.status(200).json({
          message: 'Banner berhasil dihapus',
          data: result,
        });
      })
      .catch((error) => next(error));
};
