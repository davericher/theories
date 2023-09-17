exports.up = function (knex) {
  return knex.schema.createTable('critique', (table) => {
    table.increments('id').primary();
    table.text('description').notNullable();
    table.timestamp('datePresented').defaultTo(knex.fn.now());
    table.text('source');
    table.integer('againstTheory').references('id').inTable('theories');
    table.integer('presentedBy').references('id').inTable('critic');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('critique');
};
