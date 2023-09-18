const knex = require('knex')(require('../knexfile').development);

const tableName = 'userRoles';

class UserRoles {
  // CRUD Operations
  static async create(data) {
    return knex(tableName).insert(data).returning('*');
  }

  static async getAll() {
    return knex(tableName).select('*');
  }

  static async getById(id) {
    return knex(tableName).where('id', id).first();
  }

  static async update(id, data) {
    return knex(tableName).where('id', id).update(data).returning('*');
  }

  static async delete(id) {
    return knex(tableName).where('id', id).del();
  }

  // Relationships
  static async getRoleByUserId(userId) {
    return knex('roles')
      .join(tableName, 'roles.id', '=', 'userRoles.roleId')
      .where('userId', userId);
  }

  static async getUserByRoleId(roleId) {
    return knex('users')
      .join(tableName, 'users.id', '=', 'userRoles.userId')
      .where('roleId', roleId);
  }
}

module.exports = UserRoles;
