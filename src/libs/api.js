
const axios = require('axios');
const {WEB_API} = require('../constants');
const CancelToken = axios.CancelToken;

class Api {
  async _request(request) {
    const baseUrl = 'https://fcm.googleapis.com/';

    const options = {
      url: request.url,
      method: request.method ? request.method : 'get', // default
      baseURL: baseUrl,
      timeout: request.timeout === 0 ? request.timeout : 1000 * 90, // default is `0` (no timeout)
      cancelToken: new CancelToken(function executor(cancel) {
      }),
    };

    if (request.params) options.params = request.params;
    if (request.data) options.data = request.data;
    if (request.header) options.headers = request.header;

    console.log('REQUEST => ', JSON.stringify(options));
    const response = await new axios.request(options);
    return response;
  }

  singleRequest(request) {
    return new Promise(function(resolve, reject) {
      request.then((response) => resolve(response)).catch((error) => reject(error));
    });
  }

  async postFirebase(args) {
    return this._request({
      url: 'fcm/send',
      method: 'post',
      data: args,
      header: {Authorization: `key=${WEB_API}`},
    });
  }
}

const API = new Api();

module.exports = API;
