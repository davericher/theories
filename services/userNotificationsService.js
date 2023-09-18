const knex = require('knex')(require('../knexfile').development);
const UserNotifications = require('../models/UserNotifications');

class UserNotificationsService {
  static async createUserNotification(data) {
    try {
      return await UserNotifications.query(knex).insert(data);
    } catch (error) {
      console.error('Error creating user notification:', error);
      throw error;
    }
  }

  static async getUserNotificationById(id) {
    try {
      return await UserNotifications.query(knex).findById(id);
    } catch (error) {
      console.error('Error fetching user notification:', error);
      throw error;
    }
  }

  static async updateUserNotification(id, data) {
    try {
      return await UserNotifications.query(knex).patchAndFetchById(id, data);
    } catch (error) {
      console.error('Error updating user notification:', error);
      throw error;
    }
  }

  static async deleteUserNotification(id) {
    try {
      return await UserNotifications.query(knex).deleteById(id);
    } catch (error) {
      console.error('Error deleting user notification:', error);
      throw error;
    }
  }
}

module.exports = UserNotificationsService;
