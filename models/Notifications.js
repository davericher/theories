const knex = require('../knexfile').development;
const db = require('knex')(knex);

class Notification {
  // Basic CRUD
  static findAll() {
    return db('notification');
  }

  static findById(id) {
    return db('notification').where({ id }).first();
  }

  static create(notification) {
    return db('notification').insert(notification).returning('*');
  }

  static update(id, notification) {
    return db('notification').where({ id }).update(notification).returning('*');
  }

  static delete(id) {
    return db('notification').where({ id }).del();
  }

  // Convenience functions
  static findByUserId(userId) {
    return db('notification').where({ userId });
  }

  static unreadNotifications(userId) {
    return db('notification').where({ userId, readStatus: false });
  }

  static markAsRead(notificationId) {
    return db('notification')
      .where({ id: notificationId })
      .update({ readStatus: true });
  }
}

module.exports = Notification;
