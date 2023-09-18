const knex = require('knex')(require('../knexfile').development);
const Role = require('../models/Role');

class RoleService {
  static async createRole(data) {
    try {
      return await Role.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  }

  static async getRoleById(id) {
    try {
      return await Role.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching role:', error);
      throw error;
    }
  }

  static async updateRole(id, data) {
    try {
      return await Role.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating role:', error);
      throw error;
    }
  }

  static async deleteRole(id) {
    try {
      return await Role.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting role:', error);
      throw error;
    }
  }
}

module.exports = RoleService;
