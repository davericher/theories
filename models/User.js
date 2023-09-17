const knex = require('../knexfile').development;
const db = require('knex')(knex);

class User {
  // Basic CRUD
  static findAll() {
    return db('users');
  }

  static findById(id) {
    return db('users').where({ id }).first();
  }

  static create(user) {
    return db('users').insert(user).returning('*');
  }

  static update(id, user) {
    return db('users').where({ id }).update(user).returning('*');
  }

  static delete(id) {
    return db('users').where({ id }).del();
  }

  // Relationships
  static findTheories(userId) {
    return db('theories').where('proposedBy', userId);
  }

  static findEvidences(userId) {
    return db('evidence').where('presentedBy', userId);
  }

  // Convenience functions
  static findByUsername(username) {
    return db('users').where({ username }).first();
  }

  static login(username, passwordHash) {
    return db('users').where({ username, passwordHash }).first();
  }

  static updateLastLogin(id) {
    return db('users').where({ id }).update({ lastLogin: db.fn.now() });
  }

  // Fetch all notifications for a user
  static findNotifications(userId) {
    return db('notification').where('userId', userId);
  }

  // Fetch all comments made by a user
  static findComments(userId) {
    return db('comment').where('userId', userId);
  }

  static getRolesByUserId(userId) {
    return knex('user_roles')
      .join('roles', 'user_roles.roleId', 'roles.id')
      .where('user_roles.userId', userId)
      .select('roles.*');
  }

  // Get groups associated with a user
  static getGroupsByUserId(userId) {
    return knex('user_groups')
      .join('groups', 'user_groups.groupId', 'groups.id')
      .where('user_groups.userId', userId)
      .select('groups.*');
  }

  // Assign a role to a user
  static assignRoleToUser(userId, roleId) {
    return knex('user_roles').insert({ userId, roleId });
  }

  // Remove a role from a user
  static removeRoleFromUser(userId, roleId) {
    return knex('user_roles').where({ userId, roleId }).del();
  }

  // Add a user to a group
  static addUserToGroup(userId, groupId) {
    return knex('user_groups').insert({ userId, groupId });
  }

  // Remove a user from a group
  static removeUserFromGroup(userId, groupId) {
    return knex('user_groups').where({ userId, groupId }).del();
  }
}

module.exports = User;
