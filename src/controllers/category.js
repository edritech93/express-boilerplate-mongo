const Category = require('../models/category');
const {validationResult} = require('express-validator');

exports.createCategory = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  const objCategory = new Category(req.body);
  objCategory.save()
      .then((result) => {
        res.status(201).json({
          message: 'Kategori berhasil ditambahkan',
          data: result,
        });
      }).catch((error) => next(error));
};

exports.getCategory = (req, res, next) => {
  const {page, limit} = req.query;
  Category.find()
      .skip(parseInt(limit * page, 10))
      .limit(parseInt(limit, 10))
      .sort({createdAt: -1})
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
};

exports.editCategory = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  const {categoryId} = req.params;
  Category.findById(categoryId)
      .then((result) => {
        if (!result) {
          const err = new Error('Kategori tidak ditemukan');
          err.status = 404;
          throw err;
        }
        const {name, attachment} = req.body;
        result.name = name;
        result.attachment = attachment;
        return result.save();
      })
      .then((result) => {
        res.status(200).json({
          message: 'Kategori berhasil diubah',
          data: result,
        });
      })
      .catch((error) => next(error));
};

exports.deleteCategory = (req, res, next) => {
  const {categoryId} = req.params;
  Category.findById(categoryId)
      .then((result) => {
        if (!result) {
          const err = new Error('Kategori tidak ditemukan');
          err.status = 404;
          throw err;
        }
        return Category.findByIdAndRemove(result._id);
      })
      .then((result) => {
        res.status(200).json({
          message: 'Kategori berhasil dihapus',
          data: result,
        });
      })
      .catch((error) => next(error));
};
