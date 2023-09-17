const knex = require('knex')(require('../knexfile').development);
const UserActivityLog = require('../models/UserActivityLog');

class UserActivityLogService {
  static async createUserActivityLog(data) {
    try {
      const logId = await UserActivityLog.query(knex).insert(data);
      return logId;
    } catch (error) {
      console.error('Error creating user activity log:', error);
      throw error;
    }
  }

  static async getUserActivityLogById(id) {
    try {
      const log = await UserActivityLog.query(knex).findById(id);
      return log;
    } catch (error) {
      console.error('Error fetching user activity log:', error);
      throw error;
    }
  }

  static async updateUserActivityLog(id, data) {
    try {
      const updatedLog = await UserActivityLog.query(knex).patchAndFetchById(
        id,
        data,
      );
      return updatedLog;
    } catch (error) {
      console.error('Error updating user activity log:', error);
      throw error;
    }
  }

  static async deleteUserActivityLog(id) {
    try {
      const rowsDeleted = await UserActivityLog.query(knex).deleteById(id);
      return rowsDeleted;
    } catch (error) {
      console.error('Error deleting user activity log:', error);
      throw error;
    }
  }
}

module.exports = UserActivityLogService;
