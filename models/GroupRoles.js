const knex = require('knex')(require('../knexfile').development);

const tableName = 'groupRoles';

class GroupRoles {
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
  static async getRoleByGroupId(groupId) {
    return knex('roles')
      .join(tableName, 'roles.id', '=', 'groupRoles.roleId')
      .where('groupId', groupId);
  }

  static async getGroupByRoleId(roleId) {
    return knex('groups')
      .join(tableName, 'groups.id', '=', 'groupRoles.groupId')
      .where('roleId', roleId);
  }
}

module.exports = GroupRoles;
