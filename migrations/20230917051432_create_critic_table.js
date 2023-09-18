exports.up = (knex) => {
  return knex.schema.createTable('critic', (table) => {
    table.increments('id').primary();
    table.string('firstName').notNullable();
    table.string('lastName').notNullable();
    table.string('affiliation');
    table.text('contactDetails');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('critic');
};
