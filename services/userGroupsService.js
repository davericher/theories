const knex = require('knex')(require('../knexfile').development);
const UserGroups = require('../models/UserGroups');

class UserGroupsService {
  static async createUserGroup(data) {
    try {
      const userGroupId = await UserGroups.query(knex).insert(data);
      return userGroupId;
    } catch (error) {
      console.error('Error creating user group:', error);
      throw error;
    }
  }

  static async getUserGroupById(id) {
    try {
      const userGroup = await UserGroups.query(knex).findById(id);
      return userGroup;
    } catch (error) {
      console.error('Error fetching user group:', error);
      throw error;
    }
  }

  static async updateUserGroup(id, data) {
    try {
      const updatedUserGroup = await UserGroups.query(knex).patchAndFetchById(
        id,
        data,
      );
      return updatedUserGroup;
    } catch (error) {
      console.error('Error updating user group:', error);
      throw error;
    }
  }

  static async deleteUserGroup(id) {
    try {
      const rowsDeleted = await UserGroups.query(knex).deleteById(id);
      return rowsDeleted;
    } catch (error) {
      console.error('Error deleting user group:', error);
      throw error;
    }
  }
}

module.exports = UserGroupsService;
