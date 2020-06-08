module.exports = function (app) {
  const db = app.get('knexClient');
  const tableNameDoctor = 'doctors';

  db.schema.hasTable(tableNameDoctor).then(exists => {
    if (!exists) {
      db.schema.createTable(tableNameDoctor, table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable();
        table.string('phone');
        table.integer('experienceYears').notNullable();
        table.string('department').notNullable();
        table.string('googleId');
        table.string('facebookId');

      })
        .then(() => console.log(`Created ${tableNameDoctor} table`))
        .catch(e => console.error(`Error creating ${tableNameDoctor} table`, e));
    }
  });

  return db;
};
