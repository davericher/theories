exports.up = function (knex) {
  return knex.schema.createTable('user_roles', (table) => {
    table
      .integer('userId')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('roleId')
      .unsigned()
      .references('id')
      .inTable('roles')
      .onDelete('CASCADE');
    table.primary(['userId', 'roleId']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user_roles');
};
