exports.up = (knex) => {
  return knex.schema.createTable('tag', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.text('description');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('tag');
};
