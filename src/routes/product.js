const express = require('express');
const {body} = require('express-validator');

// eslint-disable-next-line new-cap
const router = express.Router();
const controllerProduct = require('../controllers/product');

const objValidate = [
  body('name')
      .isString().withMessage('Nama Produk Harus String')
      .isLength({min: 6}).withMessage('Nama Produk Minimal 6 Char'),
  body('description')
      .isString().withMessage('Deskripsi Produk Harus String')
      .isLength({min: 20}).withMessage('Deskripsi Produk Minimal 20 Char'),
  body('price')
      .notEmpty().withMessage('Harga Produk Dibutuhkan'),
  body('categoryId')
      .notEmpty().withMessage('Kategori Produk Dibutuhkan'),
];

router.post('/', objValidate, controllerProduct.createProduct);

router.get('/all', controllerProduct.getProductAll);

router.get('/:productId', controllerProduct.getProductById);

router.put('/:productId', objValidate, controllerProduct.editProduct);

router.delete('/:productId', controllerProduct.deleteProduct);

module.exports = router;
