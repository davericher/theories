exports.up = (knex) => {
  return knex.schema.createTable('theoryDiscipline', (table) => {
    table.increments('id').primary();
    table
      .integer('theoryId')
      .references('id')
      .inTable('theories')
      .onDelete('CASCADE');
    table
      .integer('disciplineId')
      .references('id')
      .inTable('discipline')
      .onDelete('CASCADE');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('theoryDiscipline');
};
