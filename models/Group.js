const db = require('knex')(require('../knexfile').development);

class Group {
  static getAll() {
    return db('groups');
  }

  static getById(id) {
    return db('groups').where({ id }).first();
  }

  static create(group) {
    return db('groups').insert(group, 'id');
  }

  static update(id, updatedGroup) {
    return db('groups').where({ id }).update(updatedGroup);
  }

  static delete(id) {
    return db('groups').where({ id }).del();
  }

  // Get users associated with a group
  static getUsersByGroupId(groupId) {
    return db('userGroups')
      .join('users', 'userGroups.userId', 'users.id')
      .where('userGroups.groupId', groupId)
      .select('users.*');
  }

  // Get roles associated with a group
  static getRolesByGroupId(groupId) {
    return db('groupRoles')
      .join('roles', 'groupRoles.roleId', 'roles.id')
      .where('groupRoles.groupId', groupId)
      .select('roles.*');
  }
}

module.exports = Group;
