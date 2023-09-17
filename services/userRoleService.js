// const knex = require('knex')(/* your knex configuration */);
// const UserRoles = require('../models/UserRoles');

// // TODO

// class UserRolesService {
//   static async createUserRole(data) {
//     try {
//       const userRoleId = await UserRoles.query(knex).insert(data);
//       return userRoleId;
//     } catch (error) {
//       console.error('Error creating user role:', error);
//       throw error;
//     }
//   }

//   static async getUserRoleById(id) {
//     try {
//       const userRole = await UserRoles.query(knex).findById(id);
//       return userRole;
//     } catch (error) {
//       console.error('Error fetching user role:', error);
//       throw error;
//     }
//   }

//   static async updateUserRole(id, data) {
//     try {
//       const updatedUserRole = await UserRoles.query(knex).patchAndFetchById(
//         id,
//         data,
//       );
//       return updatedUserRole;
//     } catch (error) {
//       console.error('Error updating user role:', error);
//       throw error;
//     }
//   }

//   static async deleteUserRole(id) {
//     try {
//       const rowsDeleted = await UserRoles.query(knex).deleteById(id);
//       return rowsDeleted;
//     } catch (error) {
//       console.error('Error deleting user role:', error);
//       throw error;
//     }
//   }
// }

// module.exports = UserRolesService;
