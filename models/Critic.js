const db = require('knex')(require('../knexfile').development);

class Critic {
  // Basic CRUD
  static findAll() {
    return db('critic');
  }

  static findById(id) {
    return db('critic').where({ id }).first();
  }

  static create(critic) {
    return db('critic').insert(critic).returning('*');
  }

  static update(id, critic) {
    return db('critic').where({ id }).update(critic).returning('*');
  }

  static delete(id) {
    return db('critic').where({ id }).del();
  }

  // Relationships
  static findCritiques(criticId) {
    return db('critique').where('presentedBy', criticId);
  }

  // Convenience functions
  static findByName(firstName, lastName) {
    return db('critic').where({ firstName, lastName }).first();
  }

  static findByAffiliation(affiliation) {
    return db('critic').where({ affiliation });
  }
}

module.exports = Critic;
