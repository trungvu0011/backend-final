/* eslint-disable no-console */

// users-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableNameUser = 'users';
  db.schema.hasTable(tableNameUser).then(exists => {
    if (!exists) {
      db.schema.createTable(tableNameUser, table => {
        table.increments('id');
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('phone');
        table.string('googleId');
        table.string('facebookId');

      })
        .then(() => console.log(`Created ${tableNameUser} table`))
        .catch(e => console.error(`Error creating ${tableNameUser} table`, e));
    }
  });
  return db;
};
