// const knex = require('knex')(require('../knexfile').development);
// const GroupPermissions = require('../models/GroupPermissions');

// // TODO

// class GroupPermissionsService {
//   static async createGroupPermission(data) {
//     try {
//       const groupPermissionId = await GroupPermissions.query(knex).insert(data);
//       return groupPermissionId;
//     } catch (error) {
//       console.error('Error creating group permission:', error);
//       throw error;
//     }
//   }

//   static async getGroupPermissionById(id) {
//     try {
//       const groupPermission = await GroupPermissions.query(knex).findById(id);
//       return groupPermission;
//     } catch (error) {
//       console.error('Error fetching group permission:', error);
//       throw error;
//     }
//   }

//   static async updateGroupPermission(id, data) {
//     try {
//       const updatedGroupPermission = await GroupPermissions.query(
//         knex,
//       ).patchAndFetchById(id, data);
//       return updatedGroupPermission;
//     } catch (error) {
//       console.error('Error updating group permission:', error);
//       throw error;
//     }
//   }

//   static async deleteGroupPermission(id) {
//     try {
//       const rowsDeleted = await GroupPermissions.query(knex).deleteById(id);
//       return rowsDeleted;
//     } catch (error) {
//       console.error('Error deleting group permission:', error);
//       throw error;
//     }
//   }
// }

// module.exports = GroupPermissionsService;
