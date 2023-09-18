exports.up = (knex) => {
  return knex.schema.createTable('userNotifications', (table) => {
    table.increments('id').primary();
    table.integer('userId').unsigned().notNullable();
    table.integer('notificationId').unsigned().notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());

    // Foreign keys
    table
      .foreign('userId')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .foreign('notificationId')
      .references('id')
      .inTable('notifications')
      .onDelete('CASCADE');

    // Indexes for faster query performance
    table.index('userId');
    table.index('notificationId');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('userNotifications');
};
