exports.up = function (knex) {
  return knex.schema.createTable('group_roles', (table) => {
    table
      .integer('groupId')
      .unsigned()
      .references('id')
      .inTable('groups')
      .onDelete('CASCADE');
    table
      .integer('roleId')
      .unsigned()
      .references('id')
      .inTable('roles')
      .onDelete('CASCADE');
    table.primary(['groupId', 'roleId']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('group_roles');
};
