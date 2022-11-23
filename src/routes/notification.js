const express = require('express');
const {body} = require('express-validator');

// eslint-disable-next-line new-cap
const router = express.Router();
const controllerNotification = require('../controllers/notification');

router.get('/', controllerNotification.getNotification);

router.post('/', controllerNotification.createNotification);

router.delete('/', controllerNotification.deleteNotification);

module.exports = router;
