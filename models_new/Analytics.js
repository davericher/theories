const bookshelf = require('bookshelf')(
  require('knex')(require('../knexfile').development),
);

/**
 * Analytics Model
 * Provides various analytics methods to gather insights from the data.
 */
const Analytics = bookshelf.Model.extend({
  tableName: '', // This model doesn't directly map to a table, so we leave it empty.

  /**
   * Fetch the most active users based on their activity logs.
   * @param {number} [limit=10] - The number of users to retrieve.
   * @returns {Promise<Collection>} A collection of user IDs and their activity counts.
   */
  mostActiveUsers(limit = 10) {
    return this.query((qb) => {
      qb.select('userId')
        .from('userActivityLog')
        .count('userId as activityCount')
        .groupBy('userId')
        .orderBy('activityCount', 'desc')
        .limit(limit);
    }).fetchAll();
  },

  /**
   * Fetch the most discussed theories based on the number of critiques.
   * @param {number} [limit=10] - The number of theories to retrieve.
   * @returns {Promise<Collection>} A collection of theory IDs and their critique counts.
   */
  mostDiscussedTheories(limit = 10) {
    return this.query((qb) => {
      qb.select('againstTheory')
        .from('critique')
        .count('againstTheory as critiqueCount')
        .groupBy('againstTheory')
        .orderBy('critiqueCount', 'desc')
        .limit(limit);
    }).fetchAll();
  },

  /**
   * Fetch the most used tags based on their usage in theories.
   * @param {number} [limit=10] - The number of tags to retrieve.
   * @returns {Promise<Collection>} A collection of tag IDs and their usage counts.
   */
  mostUsedTags(limit = 10) {
    return this.query((qb) => {
      qb.select('tagId')
        .from('theoryTag')
        .count('tagId as tagCount')
        .groupBy('tagId')
        .orderBy('tagCount', 'desc')
        .limit(limit);
    }).fetchAll();
  },

  // ... Add more analytics methods as needed
});

module.exports = Analytics;
