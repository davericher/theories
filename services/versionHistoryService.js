const knex = require('knex')(require('../knexfile').development);
const VersionHistory = require('../models/VersionHistory');

class VersionHistoryService {
  static async createVersionHistory(data) {
    try {
      const versionHistoryId = await VersionHistory.query(knex).insert(data);
      return versionHistoryId;
    } catch (error) {
      console.error('Error creating version history:', error);
      throw error;
    }
  }

  static async getVersionHistoryById(id) {
    try {
      const versionHistory = await VersionHistory.query(knex).findById(id);
      return versionHistory;
    } catch (error) {
      console.error('Error fetching version history:', error);
      throw error;
    }
  }

  static async updateVersionHistory(id, data) {
    try {
      const updatedVersionHistory = await VersionHistory.query(
        knex,
      ).patchAndFetchById(id, data);
      return updatedVersionHistory;
    } catch (error) {
      console.error('Error updating version history:', error);
      throw error;
    }
  }

  static async deleteVersionHistory(id) {
    try {
      const rowsDeleted = await VersionHistory.query(knex).deleteById(id);
      return rowsDeleted;
    } catch (error) {
      console.error('Error deleting version history:', error);
      throw error;
    }
  }
}

module.exports = VersionHistoryService;
