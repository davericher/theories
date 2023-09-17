exports.up = function (knex) {
  return knex.schema.createTable('notification', (table) => {
    table.increments('id').primary();
    table
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('type'); // e.g., 'new_critique', 'new_evidence', etc.
    table.text('message');
    table.boolean('readStatus').defaultTo(false);
    table.timestamp('timestamp').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('notification');
};
