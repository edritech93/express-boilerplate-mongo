const Device = require('../models/device');
const {validationResult} = require('express-validator');

exports.createDevice = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  const objDevice = new Device({
    ...req.body,
    userId: req.user._id,
  });
  objDevice.save()
      .then((result) => {
        res.status(201).json({
          message: 'Device berhasil ditambahkan',
          data: result,
        });
      }).catch((error) => next(error));
};

exports.editDevice = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  Device.findOne({userId: req.user._id})
      .then((result) => {
        if (!result) {
          const err = new Error('Device tidak ditemukan');
          err.status = 404;
          throw err;
        }
        const {token, platform} = req.body;
        result.token = token;
        result.platform = platform;
        return result.save();
      })
      .then((result) => {
        res.status(200).json({
          message: 'Device berhasil diubah',
          data: result,
        });
      })
      .catch((error) => next(error));
};

exports.deleteDevice = (req, res, next) => {
  Device.findOne({userId: req.user._id})
      .then((result) => {
        if (!result) {
          const err = new Error('Device tidak ditemukan');
          err.status = 404;
          throw err;
        }
        return Device.findByIdAndRemove(result._id);
      })
      .then((result) => {
        res.status(200).json({
          message: 'Device berhasil dihapus',
          data: result,
        });
      })
      .catch((error) => next(error));
};
