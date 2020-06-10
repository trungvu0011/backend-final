const decodeJwt = require('jwt-decode');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function doctorsHook(hook) {
    if (hook.method === 'create' || hook.params.authenticated)
      return Promise.resolve(hook);

    if (hook.params.headers) {
      const jwt = hook.params.headers.jwt;
      if (jwt) {
        const jwtPayload = decodeJwt(jwt);
        if (jwtPayload.authType === 'doctors' && jwtPayload.sub === hook.id) {
          return Promise.resolve(hook);
        }
      }
    }

    if (hook.method === 'find' || hook.method === 'get') {
      hook.params.query = hook.params.query || {};
      hook.params.query['$select'] = [
        'name',
        'experienceYears',
        'department'
      ];

      return Promise.resolve(hook);
    } else {
      throw new Error('Invalid service for doctors');
    }
  };
};
