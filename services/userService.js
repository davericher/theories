const knex = require('knex')(require('../knexfile').development);
const User = require('../models/User'); // Assuming you have a User model in the models directory

class UserService {
  static async createUser(data) {
    try {
      const userId = await User.query(knex).insert(data);
      return userId;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const user = await User.query(knex).findById(id);
      return user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  static async updateUser(id, data) {
    try {
      const updatedUser = await User.query(knex).patchAndFetchById(id, data);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const rowsDeleted = await User.query(knex).deleteById(id);
      return rowsDeleted;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

module.exports = UserService;
