// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function usersHook(hook) {
    switch (hook.method) {
      case 'find':
      case 'get':
      case 'update':
      case 'patch':
        const decodedJwt = 1;
      case 'create':
        return Promise.resolve(hook);
      default:
        throw new Error('Invalid service for users');
    }
  };
};
