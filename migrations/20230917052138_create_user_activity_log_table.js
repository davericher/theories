exports.up = (knex) => {
  return knex.schema.createTable('userActivityLog', (table) => {
    table.increments('id').primary();
    table
      .integer('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('actionType').notNullable(); // e.g., 'create', 'edit', 'delete', 'login'
    table.integer('entityId').notNullable(); // This is a generic ID. You might want to also include an 'entityType' to specify if it's a theory, evidence, etc.
    table.string('entityType').notNullable(); // e.g., 'theory', 'evidence', 'critique'
    table.timestamp('timestamp').defaultTo(knex.fn.now());
    table.text('additionalDetails'); // e.g., IP address, device details
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('userActivityLog');
};
