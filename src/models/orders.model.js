/* eslint-disable no-console */

// orders-model.js - A KnexJS
//
// See http://knexjs.org/
// for more of what you can do here.
module.exports = function (app) {
  const db = app.get('knexClient');
  const tableName = 'orders';
  db.schema.hasTable(tableName).then(exists => {
    if (!exists) {
      db.schema.createTable(tableName, table => {
        table.increments('id').primary();
        table.string('reason').notNullable();
        table.dateTime('startTime').notNullable();
        table.dateTime('endTime');
        table.integer('doctorId').unsigned().notNullable();
        table.integer('creatorId').unsigned().notNullable();
        table.dateTime('createdTime').defaultTo(db.fn.now());
        table.integer('approverId');
        table.dateTime('approvedTime');
        table.boolean('isApproved').defaultTo(false);
        table.boolean('isRejected').defaultTo(false);

        table.foreign('doctorId').references('doctors.id');
        table.foreign('creatorId').references('users.id');
      })
        .then(() => console.log(`Created ${tableName} table`))
        .catch(e => console.error(`Error creating ${tableName} table`, e));
    }
  });


  return db;
};
