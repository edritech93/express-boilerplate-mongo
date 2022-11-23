
const moment = require('moment');
const bcrypt = require('bcryptjs');

const Helper = {
  getLimit: (limit) => {
    if (limit) {
      return parseInt(limit);
    } else {
      return 999;
    }
  },
  getSkip: (page, limit) => {
    if (page) {
      const pageInt = parseInt(page);
      return pageInt * limit;
    } else {
      return 0;
    }
  },
  getNowDate: () => {
    return moment().utc(true).toDate();
  },
  hashPassword: (password) => {
    return bcrypt.hashSync(password, 10);
  },
  comparePassword: (passwordA, passwordB) => {
    return bcrypt.compareSync(passwordA, passwordB);
  },
};

module.exports = Helper;
