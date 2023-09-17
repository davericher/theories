exports.up = function (knex) {
  return knex.schema.createTable('attachment', (table) => {
    table.increments('id').primary();
    table.string('fileName').notNullable();
    table.string('fileType');
    table.timestamp('uploadDate').defaultTo(knex.fn.now());
    table.integer('uploadedBy').references('id').inTable('users');
    table.integer('associatedWithId').notNullable(); // This is a generic ID. You might want to also include an 'associatedWithType' to specify if it's a theory, evidence, etc.
    table.text('description');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('attachment');
};
