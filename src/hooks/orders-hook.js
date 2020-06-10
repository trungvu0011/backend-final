const decodeJwt = require('jwt-decode');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function ordersHook (hook) {
    return Promise.resolve(hook);
  };
};
