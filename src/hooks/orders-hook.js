module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async function ordersHook(hook) {
    if (hook.type === 'after') {
      let orders;
      if (hook.method === 'find') {
        orders = hook.result.data;
      } else {
        orders = [hook.result];
      }

      for (let i = 0; i < orders.length; i++) {
        let doctor = await hook.app.service('doctors').get(orders[i].doctorId);
        orders[i].doctorName = doctor.name;
        orders[i].doctorDepartment = doctor.department;
      }
    }

    return Promise.resolve(hook);
  };
};
