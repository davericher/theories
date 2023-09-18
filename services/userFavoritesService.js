const knex = require('knex')(require('../knexfile').development);
const UserFavorites = require('../models/UserFavorites');

class UserFavoritesService {
  static async createUserFavorite(data) {
    try {
      return await UserFavorites.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating user favorite:', error);
      throw error;
    }
  }

  static async getUserFavoriteById(id) {
    try {
      return await UserFavorites.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching user favorite:', error);
      throw error;
    }
  }

  static async updateUserFavorite(id, data) {
    try {
      return await UserFavorites.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating user favorite:', error);
      throw error;
    }
  }

  static async deleteUserFavorite(id) {
    try {
      return await UserFavorites.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting user favorite:', error);
      throw error;
    }
  }
}

module.exports = UserFavoritesService;
