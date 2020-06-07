module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function doctorsHook (hook) {
    if (hook.method === 'find' || hook.method === 'get') {
      hook.params.query['$select'] = [
        'name',
        'experienceYears',
        'department'
      ];
      return Promise.resolve(hook);
    }
    else if (hook.method === 'create') {
      return Promise.resolve(hook);
    }

    throw new Error('Invalid service for doctors');
  };
};
