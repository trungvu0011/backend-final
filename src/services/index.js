const users = require('./users/users.service.js');
const doctors = require('./doctors/doctors.service.js');
const orders = require('./orders/orders.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(doctors);
  app.configure(orders);
};
