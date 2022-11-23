const Order = require('../models/order');
const {ORDER_STATUS} = require('../constants');

exports.getOrderSeller = (req, res, next) => {
  const {page, limit} = req.query;
  Order.find()
      .skip(parseInt(limit * page, 10))
      .limit(parseInt(limit, 10))
      .sort({createdAt: -1})
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
};

exports.editOrderSeller = (req, res, next) => {
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
          const err = new Error('Order tidak ditemukan');
          err.status = 404;
          throw err;
        }
        const {orderStatusId} = req.body;
        const objOrderStatus = ORDER_STATUS.find((e) => e.id === orderStatusId);
        result.orderStatus = objOrderStatus;
        return result.save();
      })
      .then((result) => {
        res.status(200).json({
          message: 'Order berhasil diubah',
          data: result,
        });
      })
      .catch((error) => next(error));
};
