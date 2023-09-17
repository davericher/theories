const knex = require('../knexfile').development;
const db = require('knex')(knex);

class VersionHistory {
  // Basic CRUD
  static findAll() {
    return db('versionHistory');
  }

  static findById(id) {
    return db('versionHistory').where({ id }).first();
  }

  static create(versionHistory) {
    return db('versionHistory').insert(versionHistory).returning('*');
  }

  static update(id, versionHistory) {
    return db('versionHistory')
      .where({ id })
      .update(versionHistory)
      .returning('*');
  }

  static delete(id) {
    return db('versionHistory').where({ id }).del();
  }

  // Relationships
  static findTheory(versionHistoryId) {
    return db('versionHistory')
      .join('theories', 'versionHistory.theoryId', 'theories.id')
      .where('versionHistory.id', versionHistoryId)
      .select('theories.*')
      .first();
  }

  // Convenience functions
  static findByTheoryId(theoryId) {
    return db('versionHistory').where({ theoryId });
  }

  static findLatestVersion(theoryId) {
    return db('versionHistory')
      .where({ theoryId })
      .orderBy('versionNumber', 'desc')
      .first();
  }
}

module.exports = VersionHistory;
