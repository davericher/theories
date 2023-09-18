exports.up = (knex) => {
  return knex.schema.createTable('userRoles', (table) => {
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

exports.down = (knex) => {
  return knex.schema.dropTable('userRoles');
};
