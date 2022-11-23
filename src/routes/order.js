const express = require('express');
const {body} = require('express-validator');

// eslint-disable-next-line new-cap
const router = express.Router();
const controllerOrder = require('../controllers/order');

router.get('/', controllerOrder.getOrder);

router.get('/:orderId', controllerOrder.getOrderById);

router.post('/', controllerOrder.createOrder);

router.put('/:orderId', controllerOrder.editOrder);

router.delete('/:orderId', controllerOrder.deleteOrder);

module.exports = router;
