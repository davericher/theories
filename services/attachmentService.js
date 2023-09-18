const knex = require('knex')(require('../knexfile').development);
const Attachment = require('../models/Attachment');

class AttachmentService {
  static async createAttachment(data) {
    try {
      return await Attachment.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating attachment:', error);
      throw error;
    }
  }

  static async getAttachmentById(id) {
    try {
      return await Attachment.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching attachment:', error);
      throw error;
    }
  }

  static async updateAttachment(id, data) {
    try {
      return await Attachment.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating attachment:', error);
      throw error;
    }
  }

  static async deleteAttachment(id) {
    try {
      return await Attachment.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting attachment:', error);
      throw error;
    }
  }
}

module.exports = AttachmentService;
