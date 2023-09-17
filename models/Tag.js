const knex = require('../knexfile').development;
const db = require('knex')(knex);

class Tag {
  // Basic CRUD
  static findAll() {
    return db('tag');
  }

  static findById(id) {
    return db('tag').where({ id }).first();
  }

  static create(tag) {
    return db('tag').insert(tag).returning('*');
  }

  static update(id, tag) {
    return db('tag').where({ id }).update(tag).returning('*');
  }

  static delete(id) {
    return db('tag').where({ id }).del();
  }

  // Relationships
  static findTheories(tagId) {
    return db('theoryTag')
      .join('theories', 'theoryTag.theoryId', 'theories.id')
      .where('theoryTag.tagId', tagId)
      .select('theories.*');
  }

  // Convenience functions
  static findByName(name) {
    return db('tag').where({ name }).first();
  }
}

module.exports = Tag;
