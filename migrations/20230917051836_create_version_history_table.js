exports.up = function (knex) {
  return knex.schema.createTable('versionHistory', (table) => {
    table.increments('id').primary();
    table
      .integer('theoryId')
      .references('id')
      .inTable('theories')
      .onDelete('CASCADE');
    table.integer('versionNumber').notNullable();
    table.timestamp('dateOfChange').defaultTo(knex.fn.now());
    table.integer('changedBy').references('id').inTable('users');
    table.text('changeDescription');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('versionHistory');
};
