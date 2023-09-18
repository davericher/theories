const knex = require('knex')(require('../knexfile').development);
const Group = require('../models/Group');

class GroupService {
  static async createGroup(data) {
    try {
      return await Group.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  }

  static async getGroupById(id) {
    try {
      return await Group.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching group:', error);
      throw error;
    }
  }

  static async updateGroup(id, data) {
    try {
      return await Group.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating group:', error);
      throw error;
    }
  }

  static async deleteGroup(id) {
    try {
      return await Group.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting group:', error);
      throw error;
    }
  }
}

module.exports = GroupService;
