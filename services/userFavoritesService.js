const knex = require('knex')(require('../knexfile').development);
const UserFavorites = require('../models/UserFavorites');

// TODO

class UserFavoritesService {
  static async createUserFavorite(data) {
    try {
      const userFavoriteId = await UserFavorites.query(knex).insert(data);
      return userFavoriteId;
    } catch (error) {
      console.error('Error creating user favorite:', error);
      throw error;
    }
  }

  static async getUserFavoriteById(id) {
    try {
      const userFavorite = await UserFavorites.query(knex).findById(id);
      return userFavorite;
    } catch (error) {
      console.error('Error fetching user favorite:', error);
      throw error;
    }
  }

  static async updateUserFavorite(id, data) {
    try {
      const updatedUserFavorite = await UserFavorites.query(
        knex,
      ).patchAndFetchById(id, data);
      return updatedUserFavorite;
    } catch (error) {
      console.error('Error updating user favorite:', error);
      throw error;
    }
  }

  static async deleteUserFavorite(id) {
    try {
      const rowsDeleted = await UserFavorites.query(knex).deleteById(id);
      return rowsDeleted;
    } catch (error) {
      console.error('Error deleting user favorite:', error);
      throw error;
    }
  }
}

module.exports = UserFavoritesService;
