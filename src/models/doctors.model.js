module.exports = function (app) {
  const db = app.get('knexClient');
  const tableNameDoctor = 'doctors';

  db.schema.hasTable(tableNameDoctor).then(exists => {
    if (!exists) {
      db.schema.createTable(tableNameDoctor, table => {
        table.increments('id');
        table.string('name');
        table.string('email').unique();
        table.string('password');
        table.string('phone');
        table.string('experienceYears');
        table.string('department');
        table.string('googleId');
        table.string('facebookId');

      })
        .then(() => console.log(`Created ${tableNameDoctor} table`))
        .catch(e => console.error(`Error creating ${tableNameDoctor} table`, e));
    }
  });

  return db;
};
