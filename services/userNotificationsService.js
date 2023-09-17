// const knex = require('knex')(require('../knexfile').development);
// const UserNotifications = require('../models/UserNotifications');

// // TODO

// class UserNotificationsService {
//   static async createUserNotification(data) {
//     try {
//       const userNotificationId =
//         await UserNotifications.query(knex).insert(data);
//       return userNotificationId;
//     } catch (error) {
//       console.error('Error creating user notification:', error);
//       throw error;
//     }
//   }

//   static async getUserNotificationById(id) {
//     try {
//       const userNotification = await UserNotifications.query(knex).findById(id);
//       return userNotification;
//     } catch (error) {
//       console.error('Error fetching user notification:', error);
//       throw error;
//     }
//   }

//   static async updateUserNotification(id, data) {
//     try {
//       const updatedUserNotification = await UserNotifications.query(
//         knex,
//       ).patchAndFetchById(id, data);
//       return updatedUserNotification;
//     } catch (error) {
//       console.error('Error updating user notification:', error);
//       throw error;
//     }
//   }

//   static async deleteUserNotification(id) {
//     try {
//       const rowsDeleted = await UserNotifications.query(knex).deleteById(id);
//       return rowsDeleted;
//     } catch (error) {
//       console.error('Error deleting user notification:', error);
//       throw error;
//     }
//   }
// }

// module.exports = UserNotificationsService;
