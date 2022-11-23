const multer = require('multer');
const fs = require('fs');
const {validationResult} = require('express-validator');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathImage = 'images';
    if (!fs.existsSync(pathImage)) {
      fs.mkdirSync(pathImage, {recursive: true});
    }
    cb(null, pathImage);
  },
  filename: function(req, file, cb) {
    const ext = file.originalname.match(/\..*$/)[0];
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const fileFilterImage = (req, file, cb) => {
  if (file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/heic') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerImage = multer({storage: fileStorage, fileFilter: fileFilterImage});

exports.uploadImageArray = (req, res, next) => {
  const imageArray = multerImage.array('images', 5);
  imageArray(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      // NOTE: A Multer error occurred when uploading.
      res.status(500).json({message: `Multer uploading error: ${err.message}`});
      return;
    } else if (err) {
      // NOTE: An unknown error occurred when uploading.
      if (err.name == 'ExtensionError') {
        res.status(413).json({message: err.message});
      } else {
        res.status(500).json({
          message: `unknown uploading error: ${err.message}`,
        });
      }
      return;
    }
    const errors = validationResult(req);
    if (!req.files) {
      const err = new Error('Input value tidak sesuai');
      err.status = 400;
      err.data = errors.array();
      throw err;
    }
    const fileString = req.files.map((e) => e.path);
    res.status(200).json(fileString);
  });
};
