const knex = require('knex')(require('../knexfile').development);
const Attachment = require('../models/Attachment');

class AttachmentService {
  static async createAttachment(data) {
    try {
      const attachmentId = await Attachment.query(knex).insert(data);
      return attachmentId;
    } catch (error) {
      console.error('Error creating attachment:', error);
      throw error;
    }
  }

  static async getAttachmentById(id) {
    try {
      const attachment = await Attachment.query(knex).findById(id);
      return attachment;
    } catch (error) {
      console.error('Error fetching attachment:', error);
      throw error;
    }
  }

  static async updateAttachment(id, data) {
    try {
      const updatedAttachment = await Attachment.query(knex).patchAndFetchById(
        id,
        data,
      );
      return updatedAttachment;
    } catch (error) {
      console.error('Error updating attachment:', error);
      throw error;
    }
  }

  static async deleteAttachment(id) {
    try {
      const rowsDeleted = await Attachment.query(knex).deleteById(id);
      return rowsDeleted;
    } catch (error) {
      console.error('Error deleting attachment:', error);
      throw error;
    }
  }
}

module.exports = AttachmentService;
