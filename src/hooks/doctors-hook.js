// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function doctorsHook (hook) {
    switch (hook.method) {
      case 'find':
      case 'get':
        hook.params.query['$select'] = [
          'name',
          'experienceYears',
          'department'
        ];

        if (hook.params.authenticated)
          hook.params.query['$select'].push('password');
      case 'create':
        return Promise.resolve(hook);
      default:
        throw new Error('Invalid service for doctors');
    }
  };
};
