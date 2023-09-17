exports.up = function (knex) {
  return knex.schema.createTable('theoryTag', (table) => {
    table.increments('id').primary();
    table
      .integer('theoryId')
      .references('id')
      .inTable('theories')
      .onDelete('CASCADE');
    table.integer('tagId').references('id').inTable('tag').onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('theoryTag');
};
