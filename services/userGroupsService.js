const knex = require('knex')(require('../knexfile').development);
const UserGroups = require('../models/UserGroups');

class UserGroupsService {
  static async createUserGroup(data) {
    try {
      return await UserGroups.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating user group:', error);
      throw error;
    }
  }

  static async getUserGroupById(id) {
    try {
      return await UserGroups.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching user group:', error);
      throw error;
    }
  }

  static async updateUserGroup(id, data) {
    try {
      return await UserGroups.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating user group:', error);
      throw error;
    }
  }

  static async deleteUserGroup(id) {
    try {
      return await UserGroups.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting user group:', error);
      throw error;
    }
  }
}

module.exports = UserGroupsService;
