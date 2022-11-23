const Province = require('../models/province');
const City = require('../models/city');
const District = require('../models/district');
const SubDistrict = require('../models/sub_district');
const PostalCode = require('../models/postal_code');
const Address = require('../models/address');
const {validationResult} = require('express-validator');

exports.getProvince = (req, res, next) => {
  const {page, limit} = req.query;
  Province.find()
      .skip(parseInt(limit * page, 10))
      .limit(parseInt(limit, 10))
      .sort({createdAt: -1})
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
};

exports.getCity = (req, res, next) => {
  const {provinceId, page, limit} = req.query;
  City.find({provinceId: provinceId})
      .skip(parseInt(limit * page, 10))
      .limit(parseInt(limit, 10))
      .sort({createdAt: -1})
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
};

exports.getDistrict = (req, res, next) => {
  const {cityId, page, limit} = req.query;
  District.find({cityId: cityId})
      .skip(parseInt(limit * page, 10))
      .limit(parseInt(limit, 10))
      .sort({createdAt: -1})
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
};

exports.getSubDistrict = (req, res, next) => {
  const {districtId, page, limit} = req.query;
  SubDistrict.find({districtId: districtId})
      .skip(parseInt(limit * page, 10))
      .limit(parseInt(limit, 10))
      .sort({createdAt: -1})
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
};

exports.getPostalCode = (req, res, next) => {
  const {subDistrictId, page, limit} = req.query;
  PostalCode.find({subDistrictId: subDistrictId})
      .skip(parseInt(limit * page, 10))
      .limit(parseInt(limit, 10))
      .sort({createdAt: -1})
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
};

exports.getAddress = (req, res, next) => {
  const {page, limit} = req.query;
  Address.find({userId: req.user._id})
      .skip(parseInt(limit * page, 10))
      .limit(parseInt(limit, 10))
      .sort({createdAt: -1})
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
};

exports.createAddress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  const objAddress = new Address({
    ...req.body,
    userId: req.user._id,
  });
  objAddress.save()
      .then((result) => {
        res.status(201).json({
          message: 'Alamat berhasil ditambahkan',
          data: result,
        });
      }).catch((error) => next(error));
};

exports.editAddress = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  const {addressId} = req.params;
  Address.findById(addressId)
      .then((result) => {
        if (!result) {
          const err = new Error('Alamat tidak ditemukan');
          err.status = 404;
          throw err;
        }
        const {typeId, provinceId, cityId, districtId,
          subDistrictId, postalCode, addressDetail} = req.body;
        result.typeId = typeId;
        result.provinceId = provinceId;
        result.cityId = cityId;
        result.districtId = districtId;
        result.subDistrictId = subDistrictId;
        result.postalCode = postalCode;
        result.addressDetail = addressDetail;
        return result.save();
      })
      .then((result) => {
        res.status(200).json({
          message: 'Alamat berhasil diubah',
          data: result,
        });
      })
      .catch((error) => next(error));
};

exports.deleteAddress = (req, res, next) => {
  const {addressId} = req.params;
  Address.findById(addressId)
      .then((result) => {
        if (!result) {
          const err = new Error('Alamat tidak ditemukan');
          err.status = 404;
          throw err;
        }
        return Address.findByIdAndRemove(result._id);
      })
      .then((result) => {
        res.status(200).json({
          message: 'Alamat berhasil dihapus',
          data: result,
        });
      })
      .catch((error) => next(error));
};
