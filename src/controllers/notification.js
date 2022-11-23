const Notification = require('../models/notification');
const {validationResult} = require('express-validator');

exports.createNotification = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  const objNotification = new Notification(req.body);
  objNotification.save()
      .then((result) => {
        res.status(201).json({
          message: 'Notifikasi berhasil ditambahkan',
          data: result,
        });
      }).catch((error) => next(error));
};

exports.getNotification = (req, res, next) => {
  const {page, limit} = req.query;
  Notification.find({userId: req.user._id})
      .skip(parseInt(limit * page, 10))
      .limit(parseInt(limit, 10))
      .sort({createdAt: -1})
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
};

exports.deleteNotification = (req, res, next) => {
  const notificationId = req.params;
  Notification.findById(notificationId)
      .then((result) => {
        if (!result) {
          const err = new Error('Notifikasi tidak ditemukan');
          err.status = 404;
          throw err;
        }
        return Notification.findByIdAndRemove(result._id);
      })
      .then((result) => {
        res.status(200).json({
          message: 'Notifikasi berhasil dihapus',
          data: result,
        });
      })
      .catch((error) => next(error));
};
