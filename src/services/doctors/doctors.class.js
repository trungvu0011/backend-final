const { Service } = require('feathers-knex');

exports.Doctors = class Doctors extends Service {
  constructor(options) {
    super({
      ...options,
      name: 'doctors'
    });
  }
};
