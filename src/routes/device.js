const express = require('express');
const {body} = require('express-validator');

// eslint-disable-next-line new-cap
const router = express.Router();
const controllerDevice = require('../controllers/device');

const objValidate = [
  body('token')
      .isString().withMessage('Token Harus String')
      .notEmpty().withMessage('Token Dibutuhkan'),
  body('platform')
      .isString().withMessage('Platform Harus String')
      .notEmpty().withMessage('Platform Dibutuhkan'),
];

router.post('/', objValidate, controllerDevice.createDevice);

router.put('/', objValidate, controllerDevice.editDevice);

router.delete('/', controllerDevice.deleteDevice);

module.exports = router;
