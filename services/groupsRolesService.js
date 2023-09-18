const knex = require('knex')(require('../knexfile').development);
const GroupRoles = require('../models/GroupRoles');

class GroupRolesService {
  static async createGroupRole(data) {
    try {
      return await GroupRoles.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating group role:', error);
      throw error;
    }
  }

  static async getGroupRoleById(id) {
    try {
      return await GroupRoles.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching group role:', error);
      throw error;
    }
  }

  static async updateGroupRole(id, data) {
    try {
      return await GroupRoles.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating group role:', error);
      throw error;
    }
  }

  static async deleteGroupRole(id) {
    try {
      return await GroupRoles.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting group role:', error);
      throw error;
    }
  }
}

module.exports = GroupRolesService;
