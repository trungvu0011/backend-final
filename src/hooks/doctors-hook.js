const jwtDecode = require('jwt-decode');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function doctorsHook (hook) {
    const jwt = hook.params.headers['jwt'];
    console.log("jwt", jwtDecode(jwt));
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    return Promise.resolve(hook);
  };
};
