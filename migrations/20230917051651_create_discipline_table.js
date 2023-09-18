exports.up = (knex) => {
  return knex.schema.createTable('discipline', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.text('description');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('discipline');
};
