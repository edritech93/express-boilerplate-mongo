
const Notification = require('../models/notification');
const API = require('../libs/api');
const cron = require('node-cron');
const CONFIG = require('../../config.json');

function serviceNotification() {
  // console.log('serviceNotification => running');
  // // NOTE: cron job run every time 09:00:00 (Server Time)
  // cron.schedule('0 9 0 * * *', () => {
  //   const body = {
  //     to: '/topics/all',
  //     collapse_key: 'type_a',
  //     notification: {
  //       title: CONFIG.appName,
  //       body: 'Apakah anda sudah belanja hari ini ?',
  //     },
  //   };
  //   API.singleRequest(API.postFirebase(body)).then((response) => {
  //     console.log('Send Notification => Successfully');
  //   }).catch((error) => {
  //     console.log('Send Notification => ', error);
  //   });
  // });
}

function sendNotification(data) {
  // return new Promise(function(resolve, reject) {
  //   try {
  //     const {token, title, description, userId, transaction_id, transaction_screen} = data;
  //     const body = {
  //       to: token,
  //       collapse_key: 'type_a',
  //       notification: {
  //         title: title,
  //         body: description,
  //       },
  //       data: {
  //         custom_notification: {
  //           id: transaction_id,
  //           screen: transaction_screen,
  //         },
  //       },
  //     };

  //     const dataSave = {
  //       title: title,
  //       description: description,
  //       userId: userId,
  //     };
  //     const newSave = new Notification(dataSave);
  //     newSave.save(function(error, notification) {
  //       if (error) {
  //         reject(error);
  //       } else {
  //         API.singleRequest(API.postFirebase(body)).then((response) => {
  //           console.log('Send Notification => Successfully');
  //         }).catch((error) => {
  //           console.log('Send Notification => ', error);
  //         });
  //         resolve(true);
  //       }
  //     });
  //   } catch (error) {
  //     reject(error);
  //   }
  // });
}

module.exports = {
  serviceNotification,
  sendNotification,
};
