const db = require('knex')(require('../knexfile').development);

class Role {
  static getAll() {
    return db('roles');
  }

  static getById(id) {
    return db('roles').where({ id }).first();
  }

  static create(role) {
    return db('roles').insert(role, 'id');
  }

  static update(id, updatedRole) {
    return db('roles').where({ id }).update(updatedRole);
  }

  static delete(id) {
    return db('roles').where({ id }).del();
  }

  // Get users associated with a role
  static getUsersByRoleId(roleId) {
    return db('user_roles')
      .join('users', 'user_roles.userId', 'users.id')
      .where('user_roles.roleId', roleId)
      .select('users.*');
  }
}

module.exports = Role;