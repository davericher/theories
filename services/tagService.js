const knex = require('knex')(require('../knexfile').development);
const Tag = require('../models/Tag');

class TagService {
  static async createTag(data) {
    try {
      return await Tag.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating tag:', error);
      throw error;
    }
  }

  static async getTagById(id) {
    try {
      return await Tag.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching tag:', error);
      throw error;
    }
  }

  static async updateTag(id, data) {
    try {
      return await Tag.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating tag:', error);
      throw error;
    }
  }

  static async deleteTag(id) {
    try {
      return await Tag.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting tag:', error);
      throw error;
    }
  }
}

module.exports = TagService;
