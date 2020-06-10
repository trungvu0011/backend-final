const decodeJwt = require('jwt-decode');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function usersHook(hook) {
    if (hook.method === 'create' || hook.params.authenticated)
      return Promise.resolve(hook);

    const jwt = hook.params.headers.jwt;
    if (jwt) {
      const jwtPayload = decodeJwt(jwt);
      if (jwtPayload.authType === 'users' && jwtPayload.sub === hook.id) {
        return Promise.resolve(hook);
      }
    }

    throw new Error('Invalid service for users');
  };
};
