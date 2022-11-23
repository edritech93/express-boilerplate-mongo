const express = require('express');
const {body} = require('express-validator');

// eslint-disable-next-line new-cap
const router = express.Router();
const controllerOrderSeller = require('../controllers/order_seller');

router.get('/', controllerOrderSeller.getOrderSeller);

router.put('/:orderId', controllerOrderSeller.editOrderSeller);

module.exports = router;
