exports.up = (knex) => {
  return knex.schema.createTable('groupRoles', (table) => {
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

exports.down = (knex) => {
  return knex.schema.dropTable('groupRoles');
};
