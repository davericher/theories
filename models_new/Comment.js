const bookshelf = require('bookshelf')(
  require('knex')(require('../knexfile').development),
);

/**
 * Comment Model
 * Represents the comments made by users on theories.
 */
const Comment = bookshelf.Model.extend({
  tableName: 'comment',

  /**
   * Fetch all comments.
   * @returns {Promise<Collection>} A collection of Comment models.
   */
  findAll() {
    return this.fetchAll();
  },

  /**
   * Fetch a specific comment by its ID.
   * @param {number} id - The ID of the comment.
   * @returns {Promise<Model|null>} A Comment model or null if not found.
   */
  findById(id) {
    return this.where({ id }).fetch();
  },

  /**
   * Create a new comment.
   * @param {Object} comment - The comment data.
   * @returns {Promise<Model>} The newly created Comment model.
   */
  create(comment) {
    return this.save(comment, { method: 'insert' });
  },

  /**
   * Update a comment.
   * @param {number} id - The ID of the comment.
   * @param {Object} comment - The updated comment data.
   * @returns {Promise<Model>} The updated Comment model.
   */
  update(id, comment) {
    return this.where({ id }).save(comment, { patch: true });
  },

  /**
   * Delete a comment by its ID.
   * @param {number} id - The ID of the comment.
   * @returns {Promise<Model>} The deleted Comment model.
   */
  delete(id) {
    return this.where({ id }).destroy();
  },

  /**
   * Fetch the user associated with a given comment.
   * @param {number} commentId - The ID of the comment.
   * @returns {Promise<Model|null>} The associated user or null if not found.
   */
  findUser(commentId) {
    return this.related('user').where({ 'comment.id': commentId }).fetch();
  },

  /**
   * Fetch all comments made by a specific user.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Collection>} A collection of Comment models.
   */
  findByUserId(userId) {
    return this.where({ userId }).fetchAll();
  },

  /**
   * Fetch all comments made on a specific theory.
   * @param {number} theoryId - The ID of the theory.
   * @returns {Promise<Collection>} A collection of Comment models.
   */
  findByTheoryId(theoryId) {
    return this.where({ theoryId }).fetchAll();
  },

  /**
   * Fetch the most recent comments.
   * @param {number} [limit=10] - The number of comments to retrieve.
   * @returns {Promise<Collection>} A collection of the most recent Comment models.
   */
  recentComments(limit = 10) {
    return this.query((qb) => {
      qb.orderBy('timestamp', 'desc').limit(limit);
    }).fetchAll();
  },

  // Define the relationship to the User model
  user() {
    return this.belongsTo('User', 'userId');
  },

  // ... Add more relationships and methods as needed
});

module.exports = Comment;
