const knex = require('knex')(require('../knexfile').development);
const AccessControl = require('../models/AccessControl');

class AccessControlService {
  static async createAccessControl(data) {
    try {
      const accessControlId = await AccessControl.query(knex).insert(data);
      return accessControlId;
    } catch (error) {
      console.error('Error creating access control:', error);
      throw error;
    }
  }

  static async getAccessControlById(id) {
    try {
      const accessControl = await AccessControl.query(knex).findById(id);
      return accessControl;
    } catch (error) {
      console.error('Error fetching access control:', error);
      throw error;
    }
  }

  static async updateAccessControl(id, data) {
    try {
      const updatedAccessControl = await AccessControl.query(
        knex,
      ).patchAndFetchById(id, data);
      return updatedAccessControl;
    } catch (error) {
      console.error('Error updating access control:', error);
      throw error;
    }
  }

  static async deleteAccessControl(id) {
    try {
      const rowsDeleted = await AccessControl.query(knex).deleteById(id);
      return rowsDeleted;
    } catch (error) {
      console.error('Error deleting access control:', error);
      throw error;
    }
  }
}

module.exports = AccessControlService;
