const express = require('express');

// eslint-disable-next-line new-cap
const router = express.Router();
const controllerAttachment = require('../controllers/attachment');

router.post('/image-array', controllerAttachment.uploadImageArray);

module.exports = router;
