const db = require('knex')(require('../knexfile').development);

class Discipline {
  // Basic CRUD
  static findAll() {
    return db('discipline');
  }

  static findById(id) {
    return db('discipline').where({ id }).first();
  }

  static create(discipline) {
    return db('discipline').insert(discipline).returning('*');
  }

  static update(id, discipline) {
    return db('discipline').where({ id }).update(discipline).returning('*');
  }

  static delete(id) {
    return db('discipline').where({ id }).del();
  }

  // Relationships
  // Assuming a many-to-many relationship with theories via a join table
  static findTheories(disciplineId) {
    return db('theoryDiscipline')
      .join('theories', 'theoryDiscipline.theoryId', 'theories.id')
      .where('theoryDiscipline.disciplineId', disciplineId)
      .select('theories.*');
  }

  // Convenience functions
  static findByName(name) {
    return db('discipline').where({ name }).first();
  }
}

module.exports = Discipline;
