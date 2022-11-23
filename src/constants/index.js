const PRIVATE_KEY = 'langkok@@2021';
const TIME_AGE_ACCESS_TOKEN = '1d';
const TIME_AGE_REFRESH_TOKEN = '7d';

const ORDER_STATUS = [
  {
    id: 0,
    text: 'Dipesan',
  },
  {
    id: 1,
    text: 'Diproses',
  },
  {
    id: 2,
    text: 'Dikirim',
  },
  {
    id: 3,
    text: 'Diterima',
  },
];

const WEB_API = 'AAAAqJfuDQo:APA91bFsNfTA7QlvaBxpCZB2Wwu5WlSE9c_xYOnIzaGzYA4UirKsu3qcFx9TJNgP0AIDOkFfCGYd76zSEKB6JtQ1buthPAFWVvUWmZb7t5Aq8-8EliKE4nMN6S7oI_kSMYnP5_zSEraX';

const ROLE = {
  ADMIN: 0,
  USER: 1,
};

module.exports = {
  PRIVATE_KEY,
  TIME_AGE_ACCESS_TOKEN,
  TIME_AGE_REFRESH_TOKEN,
  ORDER_STATUS,
  WEB_API,
  ROLE,
};
