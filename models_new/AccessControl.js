const bookshelf = require('bookshelf')(
  require('knex')(require('../knexfile').development),
);

/**
 * AccessControl Model
 * Represents the access control entities in the system.
 */
const AccessControl = bookshelf.Model.extend({
  tableName: 'accessControl',

  /**
   * Fetch all access control records.
   * @returns {Promise<Collection>} A collection of AccessControl models.
   */
  findAll() {
    return this.fetchAll();
  },

  /**
   * Fetch an access control record by its ID.
   * @param {number} id - The ID of the access control record.
   * @returns {Promise<Model|null>} An AccessControl model or null if not found.
   */
  findById(id) {
    return this.where({ id }).fetch();
  },

  /**
   * Create a new access control record.
   * @param {Object} accessControl - The access control data.
   * @returns {Promise<Model>} The newly created AccessControl model.
   */
  create(accessControl) {
    return this.save(accessControl, { method: 'insert' });
  },

  /**
   * Update an existing access control record.
   * @param {number} id - The ID of the access control record.
   * @param {Object} accessControl - The updated access control data.
   * @returns {Promise<Model>} The updated AccessControl model.
   */
  update(id, accessControl) {
    return this.where({ id }).save(accessControl, { patch: true });
  },

  /**
   * Delete an access control record by its ID.
   * @param {number} id - The ID of the access control record.
   * @returns {Promise<Model>} The deleted AccessControl model.
   */
  delete(id) {
    return this.where({ id }).destroy();
  },

  /**
   * Fetch access control records by user ID.
   * @param {number} userId - The user ID.
   * @returns {Promise<Collection>} A collection of AccessControl models.
   */
  findByUserId(userId) {
    return this.where({ userId }).fetchAll();
  },

  /**
   * Fetch access control records by entity ID and type.
   * @param {number} entityId - The entity ID.
   * @param {string} entityType - The entity type.
   * @returns {Promise<Collection>} A collection of AccessControl models.
   */
  findByEntityIdAndType(entityId, entityType) {
    return this.where({ entityId, entityType }).fetchAll();
  },

  /**
   * Check if a user has a specific type of access to an entity.
   * @param {number} userId - The user ID.
   * @param {number} entityId - The entity ID.
   * @param {string} entityType - The entity type.
   * @param {string} accessType - The type of access.
   * @returns {Promise<Model|null>} An AccessControl model or null if the user doesn't have the specified access.
   */
  userHasAccess(userId, entityId, entityType, accessType) {
    return this.where({ userId, entityId, entityType, accessType }).fetch();
  },
});

module.exports = AccessControl;
