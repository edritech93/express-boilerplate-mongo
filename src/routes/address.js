const express = require('express');
const {body} = require('express-validator');

// eslint-disable-next-line new-cap
const router = express.Router();
const controllerAddress = require('../controllers/address');

const objValidate = [
  body('typeId')
      .notEmpty().withMessage('Type ID Dibutuhkan'),
  body('provinceId')
      .notEmpty().withMessage('Province ID Dibutuhkan'),
  body('cityId')
      .notEmpty().withMessage('City ID Dibutuhkan'),
  body('districtId')
      .notEmpty().withMessage('District ID Dibutuhkan'),
  body('subDistrictId')
      .notEmpty().withMessage('Sub District ID Dibutuhkan'),
  body('postalCode')
      .notEmpty().withMessage('Postal Code Dibutuhkan'),
  body('addressDetail')
      .notEmpty().withMessage('Alamat Detail ID Dibutuhkan'),
];


router.get('/', controllerAddress.getAddress);

router.post('/', objValidate, controllerAddress.createAddress);

router.put('/:addressId', objValidate, controllerAddress.editAddress);

router.delete('/:addressId', controllerAddress.deleteAddress);

router.get('/province', controllerAddress.getProvince);

router.get('/city', controllerAddress.getCity);

router.get('/district', controllerAddress.getDistrict);

router.get('/sub-district', controllerAddress.getSubDistrict);

router.get('/postal-code', controllerAddress.getPostalCode);

module.exports = router;
