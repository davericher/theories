const knex = require('../knexfile').development;
const db = require('knex')(knex);

class TheoryDiscipline {
  // Basic CRUD
  static findAll() {
    return db('theoryDiscipline');
  }

  static findById(id) {
    return db('theoryDiscipline').where({ id }).first();
  }

  static create(theoryDiscipline) {
    return db('theoryDiscipline').insert(theoryDiscipline).returning('*');
  }

  static delete(id) {
    return db('theoryDiscipline').where({ id }).del();
  }

  // Relationships
  static findTheory(theoryDisciplineId) {
    return db('theoryDiscipline')
      .join('theories', 'theoryDiscipline.theoryId', 'theories.id')
      .where('theoryDiscipline.id', theoryDisciplineId)
      .select('theories.*')
      .first();
  }

  static findDiscipline(theoryDisciplineId) {
    return db('theoryDiscipline')
      .join('discipline', 'theoryDiscipline.disciplineId', 'discipline.id')
      .where('theoryDiscipline.id', theoryDisciplineId)
      .select('discipline.*')
      .first();
  }

  // Convenience functions
  static findByTheoryId(theoryId) {
    return db('theoryDiscipline').where({ theoryId });
  }

  static findByDisciplineId(disciplineId) {
    return db('theoryDiscipline').where({ disciplineId });
  }
}

module.exports = TheoryDiscipline;
