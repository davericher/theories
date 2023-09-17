// const knex = require('knex')(require('../knexfile').development);
// const GroupMembers = require('../models/GroupMembers');

// // TODO 

// class GroupMembersService {
//   static async createGroupMember(data) {
//     try {
//       const groupMemberId = await GroupMembers.query(knex).insert(data);
//       return groupMemberId;
//     } catch (error) {
//       console.error('Error creating group member:', error);
//       throw error;
//     }
//   }

//   static async getGroupMemberById(id) {
//     try {
//       const groupMember = await GroupMembers.query(knex).findById(id);
//       return groupMember;
//     } catch (error) {
//       console.error('Error fetching group member:', error);
//       throw error;
//     }
//   }

//   static async updateGroupMember(id, data) {
//     try {
//       const updatedGroupMember = await GroupMembers.query(
//         knex,
//       ).patchAndFetchById(id, data);
//       return updatedGroupMember;
//     } catch (error) {
//       console.error('Error updating group member:', error);
//       throw error;
//     }
//   }

//   static async deleteGroupMember(id) {
//     try {
//       const rowsDeleted = await GroupMembers.query(knex).deleteById(id);
//       return rowsDeleted;
//     } catch (error) {
//       console.error('Error deleting group member:', error);
//       throw error;
//     }
//   }
// }

// module.exports = GroupMembersService;
