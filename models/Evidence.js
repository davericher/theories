const db = require('knex')(require('../knexfile').development);

class Evidence {
  // Basic CRUD
  static findAll() {
    return db('evidence');
  }

  static findById(id) {
    return db('evidence').where({ id }).first();
  }

  static create(evidence) {
    return db('evidence').insert(evidence).returning('*');
  }

  static update(id, evidence) {
    return db('evidence').where({ id }).update(evidence).returning('*');
  }

  static delete(id) {
    return db('evidence').where({ id }).del();
  }

  // Relationships
  static findPresenter(evidenceId) {
    return db('evidence')
      .join('users', 'evidence.presentedBy', 'users.id')
      .where('evidence.id', evidenceId)
      .select('users.*')
      .first();
  }

  static findSupportedTheory(evidenceId) {
    return db('evidence')
      .join('theories', 'evidence.supportsTheory', 'theories.id')
      .where('evidence.id', evidenceId)
      .select('theories.*')
      .first();
  }

  // Convenience functions
  static findBySource(source) {
    return db('evidence').where({ source });
  }

  static recentEvidences(limit = 10) {
    return db('evidence').orderBy('datePresented', 'desc').limit(limit);
  }
}

module.exports = Evidence;
