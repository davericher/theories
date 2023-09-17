exports.up = function (knex) {
  return knex.schema.createTable('accessControl', (table) => {
    table.increments('id').primary();
    table
      .integer('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.integer('entityId').notNullable(); // This is a generic ID. You might want to also include an 'entityType' to specify if it's a theory, evidence, etc.
    table.string('entityType').notNullable(); // e.g., 'theory', 'evidence', 'critique'
    table.string('accessType').notNullable(); // e.g., 'view', 'edit', 'delete'
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('accessControl');
};
