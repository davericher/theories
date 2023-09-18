const bookshelf = require('bookshelf')(
  require('knex')(require('../knexfile').development),
);

/**
 * Discipline Model
 * Represents academic disciplines that theories can belong to.
 */
const Discipline = bookshelf.Model.extend({
  tableName: 'discipline',

  /**
   * Fetch all disciplines.
   * @returns {Promise<Collection>} A collection of Discipline models.
   */
  findAll() {
    return this.fetchAll();
  },

  /**
   * Fetch a specific discipline by its ID.
   * @param {number} id - The ID of the discipline.
   * @returns {Promise<Model|null>} A Discipline model or null if not found.
   */
  findById(id) {
    return this.where({ id }).fetch();
  },

  /**
   * Create a new discipline.
   * @param {Object} discipline - The discipline data.
   * @returns {Promise<Model>} The newly created Discipline model.
   */
  create(discipline) {
    return this.save(discipline, { method: 'insert' });
  },

  /**
   * Update a discipline's details.
   * @param {number} id - The ID of the discipline.
   * @param {Object} discipline - The updated discipline data.
   * @returns {Promise<Model>} The updated Discipline model.
   */
  update(id, discipline) {
    return this.where({ id }).save(discipline, { patch: true });
  },

  /**
   * Delete a discipline by its ID.
   * @param {number} id - The ID of the discipline.
   * @returns {Promise<Model>} The deleted Discipline model.
   */
  delete(id) {
    return this.where({ id }).destroy();
  },

  /**
   * Fetch all theories associated with a specific discipline.
   * @param {number} disciplineId - The ID of the discipline.
   * @returns {Promise<Collection>} A collection of theories associated with the discipline.
   */
  findTheories(disciplineId) {
    return this.related('theories')
      .where({ 'theoryDiscipline.disciplineId': disciplineId })
      .fetchAll();
  },

  /**
   * Fetch a discipline by its name.
   * @param {string} name - The name of the discipline.
   * @returns {Promise<Model|null>} A Discipline model or null if not found.
   */
  findByName(name) {
    return this.where({ name }).fetch();
  },

  // Define the relationships
  theories() {
    return this.belongsToMany('Theory').through(
      'TheoryDiscipline',
      'disciplineId',
      'theoryId',
    );
  },

  // ... Add more relationships and methods as needed
});

module.exports = Discipline;
