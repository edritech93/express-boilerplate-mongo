const express = require('express');
const {body} = require('express-validator');

// eslint-disable-next-line new-cap
const router = express.Router();
const controllerUser = require('../controllers/user');

const objValidate = [
  body('fullName')
      .isString().withMessage('Nama Lengkap Harus String')
      .notEmpty().withMessage('Nama Lengkap Dibutuhkan'),
  body('email')
      .isString().withMessage('Email Harus String')
      .notEmpty().withMessage('Email Dibutuhkan'),
  body('phoneNumber')
      .isString().withMessage('Nomor HP. Harus String')
      .isLength({min: 10}).withMessage('Nomor HP. Minimal 10 Char'),
  body('password')
      .isString().withMessage('Password Harus String')
      .isLength({min: 6}).withMessage('Password Minimal 6 Char'),
];

router.get('/', controllerUser.getProfile);

router.put('/', objValidate, controllerUser.editProfile);

router.put('/relogin', controllerUser.reloginUser);

module.exports = router;
