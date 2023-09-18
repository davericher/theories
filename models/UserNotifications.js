const knex = require('knex')(require('../knexfile').development);

const tableName = 'userNotifications';

class UserNotification {
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
  static async getNotificationsByUserId(userId) {
    return knex('notifications')
      .join(
        tableName,
        'notifications.id',
        '=',
        'userNotifications.notificationId',
      )
      .where('userId', userId);
  }

  static async getUsersByNotificationId(notificationId) {
    return knex('users')
      .join(tableName, 'users.id', '=', 'userNotifications.userId')
      .where('notificationId', notificationId);
  }
}

module.exports = UserNotification;
