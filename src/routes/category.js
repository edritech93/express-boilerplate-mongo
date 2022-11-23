const express = require('express');
const {body} = require('express-validator');

// eslint-disable-next-line new-cap
const router = express.Router();
const controllerCategory = require('../controllers/category');

const objValidate = [
  body('name')
      .isString().withMessage('Nama Kategori Harus String')
      .notEmpty().withMessage('Nama Kategori Dibutuhkan'),
  body('attachment')
      .isString().withMessage('Attachment Harus String')
      .notEmpty().withMessage('Attachment Dibutuhkan'),
];

router.post('/', objValidate, controllerCategory.createCategory);

router.put('/:categoryId', objValidate, controllerCategory.editCategory);

router.delete('/:categoryId', controllerCategory.deleteCategory);

module.exports = router;
