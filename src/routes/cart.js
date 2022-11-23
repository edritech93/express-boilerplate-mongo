const express = require('express');
const {body} = require('express-validator');

// eslint-disable-next-line new-cap
const router = express.Router();
const controllerCart = require('../controllers/cart');

const objValidate = [
  body('price')
      .notEmpty().withMessage('Harga Produk Dibutuhkan'),
  body('qty')
      .notEmpty().withMessage('Qty Produk Dibutuhkan'),
];

router.get('/', controllerCart.getCart);

router.post('/', objValidate, controllerCart.createCart);

router.put('/:productId', objValidate, controllerCart.editCart);

router.delete('/:productId', controllerCart.deleteCart);

router.delete('/all', controllerCart.deleteAllCart);

module.exports = router;
