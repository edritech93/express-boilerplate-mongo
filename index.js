const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const CONFIG = require('./config.json');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// NOTE: routes
const addressRoute = require('./src/routes/address');
const attachmentRoute = require('./src/routes/attachment');
const bannerRoute = require('./src/routes/banner');
const cartRoute = require('./src/routes/cart');
const categoryRoute = require('./src/routes/category');
const deviceRoute = require('./src/routes/device');
const notificationRoute = require('./src/routes/notification');
const productRoute = require('./src/routes/product');
const orderSellerRoute = require('./src/routes/order_seller');
const orderRoute = require('./src/routes/order');
const userRoute = require('./src/routes/user');
const withoutAuthRoute = require('./src/routes/without_auth');

// NOTE: service
const authService = require('./src/services/authorization');
// const {serviceNotification} = require('./services/notification');

app.use(bodyParser.json()); // NOTE: type JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
  next();
});

app.use('/v1/public', withoutAuthRoute);
app.all('*', authService.verifyMidleware);
app.use('/v1/address', addressRoute);
app.use('/v1/attachment', attachmentRoute);
app.use('/v1/banner', bannerRoute);
app.use('/v1/cart', cartRoute);
app.use('/v1/category', categoryRoute);
app.use('/v1/device', deviceRoute);
app.use('/v1/notification', notificationRoute);
app.use('/v1/product', productRoute);
app.use('/v1/order-seller', orderSellerRoute);
app.use('/v1/order', orderRoute);
app.use('/v1/user', userRoute);

app.use((error, req, res, next) => {
  const {status = 500, message, data} = error;
  res.status(status).json({message: message, data: data});
});

mongoose.connect(`mongodb://localhost:27017/${CONFIG.database}`, {
  // authSource: CONFIG.authSource,
  // user: CONFIG.user,
  // pass: CONFIG.pass,
}).then(() => {
  app.listen(CONFIG.portServer, () => {
    console.log(`Server is running on port ${CONFIG.portServer}`);
    // serviceNotification();
  });
}).catch((error) => console.log(error));
