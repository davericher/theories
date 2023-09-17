const knex = require('knex')(require('../knexfile').development);
const Role = require('../models/Role');

class RoleService {
  static async createRole(data) {
    try {
      const roleId = await Role.query(knex).insert(data);
      return roleId;
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  }

  static async getRoleById(id) {
    try {
      const role = await Role.query(knex).findById(id);
      return role;
    } catch (error) {
      console.error('Error fetching role:', error);
      throw error;
    }
  }

  static async updateRole(id, data) {
    try {
      const updatedRole = await Role.query(knex).patchAndFetchById(id, data);
      return updatedRole;
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  }

  static async deleteRole(id) {
    try {
      const rowsDeleted = await Role.query(knex).deleteById(id);
      return rowsDeleted;
    } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
    }
  }
}

module.exports = RoleService;
