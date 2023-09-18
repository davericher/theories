exports.up = (knex) => {
  return knex.schema.createTable('userGroups', (table) => {
    table
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('groupId')
      .unsigned()
      .references('id')
      .inTable('groups')
      .onDelete('CASCADE');
    table.primary(['userId', 'groupId']);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('userGroups');
};
