const User = require('../models/user');
const Helper = require('../libs/Helper');
const authService = require('../services/authorization');
const {validationResult} = require('express-validator');

exports.loginUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  const {phoneNumber, password} = req.body;
  User.findOne({phoneNumber: phoneNumber})
      .then((result) => {
        if (result && Helper.comparePassword(password, result.password)) {
          const accessToken = authService.setAccessToken({
            sessionData: result,
          });
          const refreshToken = authService.setRefreshToken({
            sessionData: result,
          });
          res.status(200).json({
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        } else {
          res.status(400).json({
            message: 'Username/Password anda salah',
          });
        }
      })
      .catch((error) => next(error));
};

exports.registerUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  const {password} = req.body;
  const passwordHash = Helper.hashPassword(password);
  const objUser = new User({
    ...req.body,
    password: passwordHash,
  });
  objUser.save()
      .then((result) => {
        const accessToken = authService.setAccessToken({
          sessionData: result,
        });
        const refreshToken = authService.setRefreshToken({
          sessionData: result,
        });
        res.status(200).json({
          message: 'Registrasi berhasil',
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      })
      .catch((error) => next(error));
};

exports.getProfile = (req, res, next) => {
  User.findById(req.user._id)
      .then((result) => res.status(200).json(result))
      .catch((error) => next(error));
};

exports.editProfile = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Input value tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    throw err;
  }
  User.findById(req.user._id)
      .then((result) => {
        if (!result) {
          const err = new Error('User tidak ditemukan');
          err.status = 404;
          throw err;
        }
        const {fullName, email} = req.body;
        result.fullName = fullName;
        result.email = email;
        return result.save();
      })
      .then((result) => {
        res.status(200).json({
          message: 'Profil berhasil diubah',
          data: result,
        });
      })
      .catch((error) => next(error));
};

exports.reloginUser = (req, res, next) => {
  User.findById(req.user._id)
      .then((result) => {
        if (!result) {
          const err = new Error('User tidak ditemukan');
          err.status = 404;
          throw err;
        }
        const accessToken = authService.setAccessToken({
          sessionData: result,
        });
        const refreshToken = authService.setRefreshToken({
          sessionData: result,
        });
        res.status(200).json({
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      })
      .catch((error) => next(error));
};
