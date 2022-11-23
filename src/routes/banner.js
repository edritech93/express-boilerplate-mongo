const express = require('express');
const {body} = require('express-validator');

// eslint-disable-next-line new-cap
const router = express.Router();
const controllerBanner = require('../controllers/banner');

const objValidate = [
  body('name')
      .isString().withMessage('Nama Banner Harus String')
      .isLength({min: 6}).withMessage('Nama Banner Minimal 6 Char'),
  body('description')
      .isString().withMessage('Deskripsi Banner Harus String')
      .isLength({min: 20}).withMessage('Deskripsi Banner Minimal 20 Char'),
  body('attachment')
      .isString().withMessage('Attachment Harus String')
      .notEmpty().withMessage('Attachment Dibutuhkan'),
];

router.post('/', objValidate, controllerBanner.createBanner);

router.put('/:bannerId', objValidate, controllerBanner.editBanner);

router.delete('/:bannerId', controllerBanner.deleteBanner);

module.exports = router;
