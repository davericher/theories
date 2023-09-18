const knex = require('knex')(require('../knexfile').development);
const AccessControl = require('../models/AccessControl');

class AccessControlService {
  static async createAccessControl(data) {
    try {
      return await AccessControl.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating access control:', error);
      throw error;
    }
  }

  static async getAccessControlById(id) {
    try {
      return await AccessControl.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching access control:', error);
      throw error;
    }
  }

  static async updateAccessControl(id, data) {
    try {
      return await AccessControl.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating access control:', error);
      throw error;
    }
  }

  static async deleteAccessControl(id) {
    try {
      return await AccessControl.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting access control:', error);
      throw error;
    }
  }
}

module.exports = AccessControlService;
