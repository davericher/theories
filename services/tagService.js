const knex = require('knex')(require('../knexfile').development);
const Tag = require('../models/Tag');

class TagService {
  static async createTag(data) {
    try {
      const tagId = await Tag.query(knex).insert(data);
      return tagId;
    } catch (error) {
      console.error('Error creating tag:', error);
      throw error;
    }
  }

  static async getTagById(id) {
    try {
      const tag = await Tag.query(knex).findById(id);
      return tag;
    } catch (error) {
      console.error('Error fetching tag:', error);
      throw error;
    }
  }

  static async updateTag(id, data) {
    try {
      const updatedTag = await Tag.query(knex).patchAndFetchById(id, data);
      return updatedTag;
    } catch (error) {
      console.error('Error updating tag:', error);
      throw error;
    }
  }

  static async deleteTag(id) {
    try {
      const rowsDeleted = await Tag.query(knex).deleteById(id);
      return rowsDeleted;
    } catch (error) {
      console.error('Error deleting tag:', error);
      throw error;
    }
  }
}

module.exports = TagService;
