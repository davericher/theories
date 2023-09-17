const knex = require('knex')(require('../knexfile').development);
const GroupRoles = require('../models/GroupRoles');

// TODO

class GroupRolesService {
  static async createGroupRole(data) {
    try {
      const groupRoleId = await GroupRoles.query(knex).insert(data);
      return groupRoleId;
    } catch (error) {
      console.error('Error creating group role:', error);
      throw error;
    }
  }

  static async getGroupRoleById(id) {
    try {
      const groupRole = await GroupRoles.query(knex).findById(id);
      return groupRole;
    } catch (error) {
      console.error('Error fetching group role:', error);
      throw error;
    }
  }

  static async updateGroupRole(id, data) {
    try {
      const updatedGroupRole = await GroupRoles.query(knex).patchAndFetchById(
        id,
        data,
      );
      return updatedGroupRole;
    } catch (error) {
      console.error('Error updating group role:', error);
      throw error;
    }
  }

  static async deleteGroupRole(id) {
    try {
      const rowsDeleted = await GroupRoles.query(knex).deleteById(id);
      return rowsDeleted;
    } catch (error) {
      console.error('Error deleting group role:', error);
      throw error;
    }
  }
}

module.exports = GroupRolesService;
