const knex = require('../knexfile').development;
const db = require('knex')(knex);

class Theory {
  // Basic CRUD
  static findAll() {
    return db('theories');
  }

  static findById(id) {
    return db('theories').where({ id }).first();
  }

  static create(theory) {
    return db('theories').insert(theory).returning('*');
  }

  static update(id, theory) {
    return db('theories').where({ id }).update(theory).returning('*');
  }

  static delete(id) {
    return db('theories').where({ id }).del();
  }

  // Relationships
  static findProposer(theoryId) {
    return db('theories')
      .join('users', 'theories.proposedBy', 'users.id')
      .where('theories.id', theoryId)
      .select('users.*')
      .first();
  }

  static findEvidences(theoryId) {
    return db('evidence').where('supportsTheory', theoryId);
  }

  // Convenience functions
  static findByName(name) {
    return db('theories').where({ name }).first();
  }

  static findByStatus(status) {
    return db('theories').where({ status });
  }

  static incrementVersion(id) {
    return db('theories').where({ id }).increment('versionNumber', 1);
  }

  // Fetch all comments for a theory
  static findComments(theoryId) {
    return db('comment').where('theoryId', theoryId);
  }
}

module.exports = Theory;
