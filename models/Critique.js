const db = require('knex')(require('../knexfile').development);

class Critique {
  // Basic CRUD
  static findAll() {
    return db('critique');
  }

  static findById(id) {
    return db('critique').where({ id }).first();
  }

  static create(critique) {
    return db('critique').insert(critique).returning('*');
  }

  static update(id, critique) {
    return db('critique').where({ id }).update(critique).returning('*');
  }

  static delete(id) {
    return db('critique').where({ id }).del();
  }

  // Relationships
  static findCritic(critiqueId) {
    return db('critique')
      .join('critic', 'critique.presentedBy', 'critic.id')
      .where('critique.id', critiqueId)
      .select('critic.*')
      .first();
  }

  static findTargetedTheory(critiqueId) {
    return db('critique')
      .join('theories', 'critique.againstTheory', 'theories.id')
      .where('critique.id', critiqueId)
      .select('theories.*')
      .first();
  }

  // Convenience functions
  static findBySource(source) {
    return db('critique').where({ source });
  }

  static recentCritiques(limit = 10) {
    return db('critique').orderBy('datePresented', 'desc').limit(limit);
  }
}

module.exports = Critique;
