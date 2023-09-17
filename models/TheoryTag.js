const knex = require('../knexfile').development;
const db = require('knex')(knex);

class TheoryTag {
  // Basic CRUD
  static findAll() {
    return db('theoryTag');
  }

  static findById(id) {
    return db('theoryTag').where({ id }).first();
  }

  static create(theoryTag) {
    return db('theoryTag').insert(theoryTag).returning('*');
  }

  static delete(id) {
    return db('theoryTag').where({ id }).del();
  }

  // Relationships
  static findTheory(theoryTagId) {
    return db('theoryTag')
      .join('theories', 'theoryTag.theoryId', 'theories.id')
      .where('theoryTag.id', theoryTagId)
      .select('theories.*')
      .first();
  }

  static findTag(theoryTagId) {
    return db('theoryTag')
      .join('tag', 'theoryTag.tagId', 'tag.id')
      .where('theoryTag.id', theoryTagId)
      .select('tag.*')
      .first();
  }

  // Convenience functions
  static findByTheoryId(theoryId) {
    return db('theoryTag').where({ theoryId });
  }

  static findByTagId(tagId) {
    return db('theoryTag').where({ tagId });
  }
}

module.exports = TheoryTag;
