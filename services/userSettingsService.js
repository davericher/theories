// const knex = require('knex')(/* your knex configuration */);
// const UserSettings = require('../models/UserSettings');

// class UserSettingsService {
//   static async createUserSetting(data) {
//     try {
//       const userSettingId = await UserSettings.query(knex).insert(data);
//       return userSettingId;
//     } catch (error) {
//       console.error('Error creating user setting:', error);
//       throw error;
//     }
//   }

//   static async getUserSettingById(id) {
//     try {
//       const userSetting = await UserSettings.query(knex).findById(id);
//       return userSetting;
//     } catch (error) {
//       console.error('Error fetching user setting:', error);
//       throw error;
//     }
//   }

//   static async updateUserSetting(id, data) {
//     try {
//       const updatedUserSetting = await UserSettings.query(
//         knex,
//       ).patchAndFetchById(id, data);
//       return updatedUserSetting;
//     } catch (error) {
//       console.error('Error updating user setting:', error);
//       throw error;
//     }
//   }

//   static async deleteUserSetting(id) {
//     try {
//       const rowsDeleted = await UserSettings.query(knex).deleteById(id);
//       return rowsDeleted;
//     } catch (error) {
//       console.error('Error deleting user setting:', error);
//       throw error;
//     }
//   }
// }

// module.exports = UserSettingsService;
