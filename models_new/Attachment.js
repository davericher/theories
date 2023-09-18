const bookshelf = require('bookshelf')(
  require('knex')(require('../knexfile').development),
);

/**
 * Attachment Model
 * Represents the attachments associated with theories.
 */
const Attachment = bookshelf.Model.extend({
  tableName: 'attachment',

  /**
   * Create a new attachment.
   * @param {number} theoryId - The ID of the associated theory.
   * @param {string} fileLink - The link to the file.
   * @returns {Promise<Model>} The newly created Attachment model.
   */
  create(theoryId, fileLink) {
    return this.save({ theoryId, fileLink }, { method: 'insert' });
  },

  /**
   * Fetch all attachments associated with a specific theory.
   * @param {number} theoryId - The ID of the theory.
   * @returns {Promise<Collection>} A collection of Attachment models.
   */
  findByTheoryId(theoryId) {
    return this.where({ theoryId }).fetchAll();
  },

  /**
   * Fetch a specific attachment by its ID.
   * @param {number} attachmentId - The ID of the attachment.
   * @returns {Promise<Model|null>} An Attachment model or null if not found.
   */
  findById(attachmentId) {
    return this.where({ id: attachmentId }).fetch();
  },

  /**
   * Update the file link of an attachment.
   * @param {number} attachmentId - The ID of the attachment.
   * @param {string} newFileLink - The new link to the file.
   * @returns {Promise<Model>} The updated Attachment model.
   */
  update(attachmentId, newFileLink) {
    return this.where({ id: attachmentId }).save(
      { fileLink: newFileLink },
      { patch: true },
    );
  },

  /**
   * Delete an attachment by its ID.
   * @param {number} attachmentId - The ID of the attachment.
   * @returns {Promise<Model>} The deleted Attachment model.
   */
  delete(attachmentId) {
    return this.where({ id: attachmentId }).destroy();
  },
});

module.exports = Attachment;
