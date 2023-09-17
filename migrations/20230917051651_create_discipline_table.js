exports.up = function (knex) {
  return knex.schema.createTable('discipline', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.text('description');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('discipline');
};
