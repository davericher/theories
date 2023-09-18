const knex = require('knex')(require('../knexfile').development);
const User = require('../models/User'); // Assuming you have a User model in the models directory

class UserService {
  static async createUser(data) {
    try {
      return await User.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      return await User.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  static async updateUser(id, data) {
    try {
      return await User.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      return await User.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

module.exports = UserService;
