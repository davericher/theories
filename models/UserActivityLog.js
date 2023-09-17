const knex = require('../knexfile').development;
const db = require('knex')(knex);

class UserActivityLog {
  // Basic CRUD
  static findAll() {
    return db('userActivityLog');
  }

  static findById(id) {
    return db('userActivityLog').where({ id }).first();
  }

  static create(activityLog) {
    return db('userActivityLog').insert(activityLog).returning('*');
  }

  static delete(id) {
    return db('userActivityLog').where({ id }).del();
  }

  // Relationships
  static findUser(activityLogId) {
    return db('userActivityLog')
      .join('users', 'userActivityLog.userId', 'users.id')
      .where('userActivityLog.id', activityLogId)
      .select('users.*')
      .first();
  }

  // Convenience functions
  static findByUserId(userId) {
    return db('userActivityLog').where({ userId });
  }

  static recentActivities(limit = 10) {
    return db('userActivityLog').orderBy('timestamp', 'desc').limit(limit);
  }

  static findByActionType(actionType) {
    return db('userActivityLog').where({ actionType });
  }

  // Log a new comment activity
  static logCommentActivity(userId, commentId) {
    return db('userActivityLog').insert({
      userId,
      actionType: 'COMMENT',
      entityId: commentId,
      timestamp: db.fn.now(),
    });
  }

  // Log a new notification activity
  static logNotificationActivity(userId, notificationId) {
    return db('userActivityLog').insert({
      userId,
      actionType: 'NOTIFICATION',
      entityId: notificationId,
      timestamp: db.fn.now(),
    });
  }
}

module.exports = UserActivityLog;
