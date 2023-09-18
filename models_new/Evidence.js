const bookshelf = require('bookshelf')(
  require('knex')(require('../knexfile').development),
);

/**
 * Evidence Model
 * Represents evidences presented by users to support theories.
 */
const Evidence = bookshelf.Model.extend({
  tableName: 'evidence',

  /**
   * Fetch all evidences.
   * @returns {Promise<Collection>} A collection of Evidence models.
   */
  findAll() {
    return this.fetchAll();
  },

  /**
   * Fetch a specific evidence by its ID.
   * @param {number} id - The ID of the evidence.
   * @returns {Promise<Model|null>} An Evidence model or null if not found.
   */
  findById(id) {
    return this.where({ id }).fetch();
  },

  /**
   * Create a new evidence.
   * @param {Object} evidence - The evidence data.
   * @returns {Promise<Model>} The newly created Evidence model.
   */
  create(evidence) {
    return this.save(evidence, { method: 'insert' });
  },

  /**
   * Update an evidence's details.
   * @param {number} id - The ID of the evidence.
   * @param {Object} evidence - The updated evidence data.
   * @returns {Promise<Model>} The updated Evidence model.
   */
  update(id, evidence) {
    return this.where({ id }).save(evidence, { patch: true });
  },

  /**
   * Delete an evidence by its ID.
   * @param {number} id - The ID of the evidence.
   * @returns {Promise<Model>} The deleted Evidence model.
   */
  delete(id) {
    return this.where({ id }).destroy();
  },

  /**
   * Fetch the user who presented a specific evidence.
   * @param {number} evidenceId - The ID of the evidence.
   * @returns {Promise<Model|null>} The user who presented the evidence or null if not found.
   */
  findPresenter(evidenceId) {
    return this.related('presenter')
      .where({ 'evidence.id': evidenceId })
      .fetch();
  },

  /**
   * Fetch the theory supported by a specific evidence.
   * @param {number} evidenceId - The ID of the evidence.
   * @returns {Promise<Model|null>} The theory supported by the evidence or null if not found.
   */
  findSupportedTheory(evidenceId) {
    return this.related('theory').where({ 'evidence.id': evidenceId }).fetch();
  },

  /**
   * Fetch all evidences from a specific source.
   * @param {string} source - The source of the evidences.
   * @returns {Promise<Collection>} A collection of Evidence models from the specified source.
   */
  findBySource(source) {
    return this.where({ source }).fetchAll();
  },

  /**
   * Fetch the most recent evidences.
   * @param {number} [limit=10] - The number of evidences to retrieve.
   * @returns {Promise<Collection>} A collection of the most recent Evidence models.
   */
  recentEvidences(limit = 10) {
    return this.query((qb) => {
      qb.orderBy('datePresented', 'desc').limit(limit);
    }).fetchAll();
  },

  // Define the relationships
  presenter() {
    return this.belongsTo('User', 'presentedBy');
  },

  theory() {
    return this.belongsTo('Theory', 'supportsTheory');
  },

  // ... Add more relationships and methods as needed
});

module.exports = Evidence;
