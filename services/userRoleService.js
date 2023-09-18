const knex = require('knex')(require('../knexfile').development);
const UserRoles = require('../models/UserRoles');

class UserRolesService {
  static async createUserRole(data) {
    try {
      return await UserRoles.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating user role:', error);
      throw error;
    }
  }

  static async getUserRoleById(id) {
    try {
      return await UserRoles.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching user role:', error);
      throw error;
    }
  }

  static async updateUserRole(id, data) {
    try {
      return await UserRoles.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  }

  static async deleteUser(userId) {
    // Before deleting the user, you might want to handle any side effects
    // For example, logging, sending goodbye emails, etc.

    // Delete the user. Associated entries in user_favorites will be deleted due to cascade.
    await knex('users').where('id', userId).del();
  }

  static async deleteUserRole(id) {
    try {
      return await UserRoles.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting user role:', error);
      throw error;
    }
  }
}

module.exports = UserRolesService;
