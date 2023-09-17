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
    return db('user_groups')
      .join('users', 'user_groups.userId', 'users.id')
      .where('user_groups.groupId', groupId)
      .select('users.*');
  }

  // Get roles associated with a group
  static getRolesByGroupId(groupId) {
    return db('group_roles')
      .join('roles', 'group_roles.roleId', 'roles.id')
      .where('group_roles.groupId', groupId)
      .select('roles.*');
  }
}

module.exports = Group;
