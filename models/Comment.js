const knex = require('../knexfile').development;
const db = require('knex')(knex);

class Comment {
  // Basic CRUD
  static findAll() {
    return db('comment');
  }

  static findById(id) {
    return db('comment').where({ id }).first();
  }

  static create(comment) {
    return db('comment').insert(comment).returning('*');
  }

  static update(id, comment) {
    return db('comment').where({ id }).update(comment).returning('*');
  }

  static delete(id) {
    return db('comment').where({ id }).del();
  }

  // Relationships
  static findUser(commentId) {
    return db('comment')
      .join('users', 'comment.userId', 'users.id')
      .where('comment.id', commentId)
      .select('users.*')
      .first();
  }

  // Convenience functions
  static findByUserId(userId) {
    return db('comment').where({ userId });
  }

  static findByTheoryId(theoryId) {
    return db('comment').where({ theoryId });
  }

  static recentComments(limit = 10) {
    return db('comment').orderBy('timestamp', 'desc').limit(limit);
  }
}

module.exports = Comment;
