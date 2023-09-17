// const knex = require('knex')(require('../knexfile').development);
// const UserPermissions = require('../models/UserPermissions');

// // TODO

// class UserPermissionsService {
//   static async createUserPermission(data) {
//     try {
//       const userPermissionId = await UserPermissions.query(knex).insert(data);
//       return userPermissionId;
//     } catch (error) {
//       console.error('Error creating user permission:', error);
//       throw error;
//     }
//   }

//   static async getUserPermissionById(id) {
//     try {
//       const userPermission = await UserPermissions.query(knex).findById(id);
//       return userPermission;
//     } catch (error) {
//       console.error('Error fetching user permission:', error);
//       throw error;
//     }
//   }

//   static async updateUserPermission(id, data) {
//     try {
//       const updatedUserPermission = await UserPermissions.query(
//         knex,
//       ).patchAndFetchById(id, data);
//       return updatedUserPermission;
//     } catch (error) {
//       console.error('Error updating user permission:', error);
//       throw error;
//     }
//   }

//   static async deleteUserPermission(id) {
//     try {
//       const rowsDeleted = await UserPermissions.query(knex).deleteById(id);
//       return rowsDeleted;
//     } catch (error) {
//       console.error('Error deleting user permission:', error);
//       throw error;
//     }
//   }
// }

// module.exports = UserPermissionsService;
