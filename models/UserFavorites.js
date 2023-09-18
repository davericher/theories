const knex = require('knex')(require('../knexfile').development);

const tableName = 'userFavorites';

class UserFavorites {
  // CRUD Operations
  static async create(data) {
    return knex(tableName).insert(data).returning('*');
  }

  static async getAll() {
    return knex(tableName).select('*');
  }

  static async getById(id) {
    return knex(tableName).where('id', id).first();
  }

  static async update(id, data) {
    return knex(tableName).where('id', id).update(data).returning('*');
  }

  static async delete(id) {
    return knex(tableName).where('id', id).del();
  }

  // Relationships
  static async getFavoritesByUserId(userId) {
    return knex('theories')
      .join(tableName, 'theories.id', '=', 'user_favorites.theoryId')
      .where('userFavorites.userId', userId);
  }

  static async getUsersByFavoriteTheory(theoryId) {
    return knex('users')
      .join(tableName, 'users.id', '=', 'user_favorites.userId')
      .where('userFavorites.theoryId', theoryId);
  }
}

module.exports = UserFavorites;
