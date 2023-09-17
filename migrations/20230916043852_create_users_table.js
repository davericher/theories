exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('password').notNullable(); // This should store a hashed password.
    table.string('first_name').nullable();
    table.string('last_name').nullable();
    table.string('profile_picture').nullable(); // This could be a URL or a path to the image file.
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at').nullable(); // For soft deletes.
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
