const knex = require('knex')(require('../knexfile').development);

const tableName = 'userGroups';

class UserGroups {
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
  static async getUserByGroupId(groupId) {
    return knex('users')
      .join(tableName, 'users.id', '=', 'userGroups.userId')
      .where('groupId', groupId);
  }

  static async getGroupByUserId(userId) {
    return knex('groups')
      .join(tableName, 'groups.id', '=', 'userGroups.groupId')
      .where('userId', userId);
  }
}

module.exports = UserGroups;
