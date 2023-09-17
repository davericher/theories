exports.up = function (knex) {
  return knex.schema.createTable('evidence', (table) => {
    table.increments('id').primary();
    table.text('description').notNullable();
    table.timestamp('datePresented').defaultTo(knex.fn.now());
    table.text('source');
    table.integer('supportsTheory').references('id').inTable('theories');
    table.integer('presentedBy').references('id').inTable('users');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('evidence');
};
