const knex = require('knex')(require('../knexfile').development);
const VersionHistory = require('../models/VersionHistory');

class VersionHistoryService {
  static async createVersionHistory(data) {
    try {
      return await VersionHistory.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating version history:', error);
      throw error;
    }
  }

  static async getVersionHistoryById(id) {
    try {
      return await VersionHistory.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching version history:', error);
      throw error;
    }
  }

  static async updateVersionHistory(id, data) {
    try {
      return await VersionHistory.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating version history:', error);
      throw error;
    }
  }

  static async deleteVersionHistory(id) {
    try {
      return await VersionHistory.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting version history:', error);
      throw error;
    }
  }
}

module.exports = VersionHistoryService;
