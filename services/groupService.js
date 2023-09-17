const knex = require('knex')(require('../knexfile').development);
const Group = require('../models/Group');

class GroupService {
  static async createGroup(data) {
    try {
      const groupId = await Group.query(knex).insert(data);
      return groupId;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  }

  static async getGroupById(id) {
    try {
      const group = await Group.query(knex).findById(id);
      return group;
    } catch (error) {
      console.error('Error fetching group:', error);
      throw error;
    }
  }

  static async updateGroup(id, data) {
    try {
      const updatedGroup = await Group.query(knex).patchAndFetchById(id, data);
      return updatedGroup;
    } catch (error) {
      console.error('Error updating group:', error);
      throw error;
    }
  }

  static async deleteGroup(id) {
    try {
      const rowsDeleted = await Group.query(knex).deleteById(id);
      return rowsDeleted;
    } catch (error) {
      console.error('Error deleting group:', error);
      throw error;
    }
  }
}

module.exports = GroupService;
