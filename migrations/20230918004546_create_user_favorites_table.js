exports.up = (knex) => {
  return knex.schema.createTable('userFavorites', (table) => {
    table.increments('id').primary();
    table.integer('userId').unsigned().notNullable();
    table.integer('theoryId').unsigned().notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());

    // Foreign keys
    table
      .foreign('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .foreign('theoryId')
      .references('id')
      .inTable('theories')
      .onDelete('CASCADE');

    // Indexes for faster query performance
    table.index('userId');
    table.index('theoryId');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('userFavorites');
};
