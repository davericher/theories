exports.up = (knex) => {
  return knex.schema.createTable('comment', (table) => {
    table.increments('id').primary();
    table
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('theoryId')
      .unsigned()
      .references('id')
      .inTable('theories')
      .onDelete('CASCADE');
    table.text('content');
    table.timestamp('timestamp').defaultTo(knex.fn.now());
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('comment');
};
