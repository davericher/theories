const knex = require('knex')(require('../knexfile').development);
const UserActivityLog = require('../models/UserActivityLog');

class UserActivityLogService {
  static async createUserActivityLog(data) {
    try {
      return await UserActivityLog.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating user activity log:', error);
      throw error;
    }
  }

  static async getUserActivityLogById(id) {
    try {
      return await UserActivityLog.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching user activity log:', error);
      throw error;
    }
  }

  static async updateUserActivityLog(id, data) {
    try {
      return await UserActivityLog.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating user activity log:', error);
      throw error;
    }
  }

  static async deleteUserActivityLog(id) {
    try {
      return await UserActivityLog.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting user activity log:', error);
      throw error;
    }
  }
}

module.exports = UserActivityLogService;
