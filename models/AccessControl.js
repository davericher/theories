const knex = require('../knexfile').development;
const db = require('knex')(knex);

class AccessControl {
  // Basic CRUD
  static findAll() {
    return db('accessControl');
  }

  static findById(id) {
    return db('accessControl').where({ id }).first();
  }

  static create(accessControl) {
    return db('accessControl').insert(accessControl).returning('*');
  }

  static update(id, accessControl) {
    return db('accessControl')
      .where({ id })
      .update(accessControl)
      .returning('*');
  }

  static delete(id) {
    return db('accessControl').where({ id }).del();
  }

  // Convenience functions
  static findByUserId(userId) {
    return db('accessControl').where({ userId });
  }

  static findByEntityIdAndType(entityId, entityType) {
    return db('accessControl').where({ entityId, entityType });
  }

  static userHasAccess(userId, entityId, entityType, accessType) {
    return db('accessControl')
      .where({ userId, entityId, entityType, accessType })
      .first();
  }
}

module.exports = AccessControl;
