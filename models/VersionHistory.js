const db = require('knex')(require('../knexfile').development);

const tableName = 'versionHistory';

class VersionHistory {
  // Basic CRUD
  static findAll() {
    return db(tableName);
  }

  static findById(id) {
    return db(tableName).where({ id }).first();
  }

  static create(versionHistory) {
    return db(tableName).insert(versionHistory).returning('*');
  }

  static update(id, versionHistory) {
    return db(tableName).where({ id }).update(versionHistory).returning('*');
  }

  static delete(id) {
    return db(tableName).where({ id }).del();
  }

  // Relationships
  static findTheory(versionHistoryId) {
    return db(tableName)
      .join('theories', 'versionHistory.theoryId', 'theories.id')
      .where('versionHistory.id', versionHistoryId)
      .select('theories.*')
      .first();
  }

  // Convenience functions
  static findByTheoryId(theoryId) {
    return db(tableName).where({ theoryId });
  }

  static findLatestVersion(theoryId) {
    return db(tableName)
      .where({ theoryId })
      .orderBy('versionNumber', 'desc')
      .first();
  }
}

module.exports = VersionHistory;
