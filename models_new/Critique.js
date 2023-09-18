const bookshelf = require('bookshelf')(
  require('knex')(require('../knexfile').development),
);

/**
 * Critique Model
 * Represents critiques presented by critics against theories.
 */
const Critique = bookshelf.Model.extend({
  tableName: 'critique',

  /**
   * Fetch all critiques.
   * @returns {Promise<Collection>} A collection of Critique models.
   */
  findAll() {
    return this.fetchAll();
  },

  /**
   * Fetch a specific critique by its ID.
   * @param {number} id - The ID of the critique.
   * @returns {Promise<Model|null>} A Critique model or null if not found.
   */
  findById(id) {
    return this.where({ id }).fetch();
  },

  /**
   * Create a new critique.
   * @param {Object} critique - The critique data.
   * @returns {Promise<Model>} The newly created Critique model.
   */
  create(critique) {
    return this.save(critique, { method: 'insert' });
  },

  /**
   * Update a critique's details.
   * @param {number} id - The ID of the critique.
   * @param {Object} critique - The updated critique data.
   * @returns {Promise<Model>} The updated Critique model.
   */
  update(id, critique) {
    return this.where({ id }).save(critique, { patch: true });
  },

  /**
   * Delete a critique by its ID.
   * @param {number} id - The ID of the critique.
   * @returns {Promise<Model>} The deleted Critique model.
   */
  delete(id) {
    return this.where({ id }).destroy();
  },

  /**
   * Fetch the critic who presented a specific critique.
   * @param {number} critiqueId - The ID of the critique.
   * @returns {Promise<Model|null>} The associated critic or null if not found.
   */
  findCritic(critiqueId) {
    return this.related('critic').where({ 'critique.id': critiqueId }).fetch();
  },

  /**
   * Fetch the theory targeted by a specific critique.
   * @param {number} critiqueId - The ID of the critique.
   * @returns {Promise<Model|null>} The targeted theory or null if not found.
   */
  findTargetedTheory(critiqueId) {
    return this.related('theory').where({ 'critique.id': critiqueId }).fetch();
  },

  /**
   * Fetch all critiques from a specific source.
   * @param {string} source - The source of the critiques.
   * @returns {Promise<Collection>} A collection of Critique models from the specified source.
   */
  findBySource(source) {
    return this.where({ source }).fetchAll();
  },

  /**
   * Fetch the most recent critiques.
   * @param {number} [limit=10] - The number of critiques to retrieve.
   * @returns {Promise<Collection>} A collection of the most recent Critique models.
   */
  recentCritiques(limit = 10) {
    return this.query((qb) => {
      qb.orderBy('datePresented', 'desc').limit(limit);
    }).fetchAll();
  },

  // Define the relationships
  critic() {
    return this.belongsTo('Critic', 'presentedBy');
  },

  theory() {
    return this.belongsTo('Theory', 'againstTheory');
  },

  // ... Add more relationships and methods as needed
});

module.exports = Critique;
