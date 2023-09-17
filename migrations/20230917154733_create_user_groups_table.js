exports.up = function (knex) {
  return knex.schema.createTable('user_groups', (table) => {
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

exports.down = function (knex) {
  return knex.schema.dropTable('user_groups');
};
