const bookshelf = require('bookshelf')(
  require('knex')(require('../knexfile').development),
);

/**
 * Critic Model
 * Represents critics who present critiques.
 */
const Critic = bookshelf.Model.extend({
  tableName: 'critic',

  /**
   * Fetch all critics.
   * @returns {Promise<Collection>} A collection of Critic models.
   */
  findAll() {
    return this.fetchAll();
  },

  /**
   * Fetch a specific critic by its ID.
   * @param {number} id - The ID of the critic.
   * @returns {Promise<Model|null>} A Critic model or null if not found.
   */
  findById(id) {
    return this.where({ id }).fetch();
  },

  /**
   * Create a new critic.
   * @param {Object} critic - The critic data.
   * @returns {Promise<Model>} The newly created Critic model.
   */
  create(critic) {
    return this.save(critic, { method: 'insert' });
  },

  /**
   * Update a critic's details.
   * @param {number} id - The ID of the critic.
   * @param {Object} critic - The updated critic data.
   * @returns {Promise<Model>} The updated Critic model.
   */
  update(id, critic) {
    return this.where({ id }).save(critic, { patch: true });
  },

  /**
   * Delete a critic by its ID.
   * @param {number} id - The ID of the critic.
   * @returns {Promise<Model>} The deleted Critic model.
   */
  delete(id) {
    return this.where({ id }).destroy();
  },

  /**
   * Fetch all critiques presented by a specific critic.
   * @param {number} criticId - The ID of the critic.
   * @returns {Promise<Collection>} A collection of critiques presented by the critic.
   */
  findCritiques(criticId) {
    return this.related('critiques')
      .where({ presentedBy: criticId })
      .fetchAll();
  },

  /**
   * Fetch a critic by their first and last name.
   * @param {string} firstName - The first name of the critic.
   * @param {string} lastName - The last name of the critic.
   * @returns {Promise<Model|null>} A Critic model or null if not found.
   */
  findByName(firstName, lastName) {
    return this.where({ firstName, lastName }).fetch();
  },

  /**
   * Fetch all critics with a specific affiliation.
   * @param {string} affiliation - The affiliation of the critic.
   * @returns {Promise<Collection>} A collection of Critic models with the specified affiliation.
   */
  findByAffiliation(affiliation) {
    return this.where({ affiliation }).fetchAll();
  },

  // Define the relationship to the Critique model
  critiques() {
    return this.hasMany('Critique', 'presentedBy');
  },

  // ... Add more relationships and methods as needed
});

module.exports = Critic;
