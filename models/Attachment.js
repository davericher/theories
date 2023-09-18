const knex = require('knex')(require('../knexfile').development);

const tableName = 'attachment';

class Attachment {
  // Create a new attachment
  static async create(theoryId, fileLink) {
    return knex(tableName).insert({ theoryId, fileLink });
  }

  // Retrieve all attachments for a specific theory
  static async findByTheoryId(theoryId) {
    return knex(tableName).where({ theoryId });
  }

  // Retrieve a specific attachment by its ID
  static async findById(attachmentId) {
    return knex(tableName).where({ id: attachmentId }).first();
  }

  // Update an attachment's file link
  static async update(attachmentId, newFileLink) {
    return knex(tableName)
      .where({ id: attachmentId })
      .update({ fileLink: newFileLink });
  }

  // Delete an attachment
  static async delete(attachmentId) {
    return knex(tableName).where({ id: attachmentId }).del();
  }
}

module.exports = Attachment;
