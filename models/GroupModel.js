const { Model, DataTypes } = require('sequelize');

class Group extends Model {
  static associate(models) {
    // Assuming you have a User model and Role model, and join table models called UserGroup and GroupRole
    this.belongsToMany(models.User, {
      through: 'UserGroup',
      foreignKey: 'groupId',
      as: 'users',
    });
    this.belongsToMany(models.Role, {
      through: 'GroupRole',
      foreignKey: 'groupId',
      as: 'roles',
    });
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async create(group) {
    return this.create(group);
  }

  static async getAll() {
    return this.findAll();
  }

  static async getById(groupId) {
    return this.findByPk(groupId);
  }

  static async delete(groupId) {
    const group = await this.findByPk(groupId);
    if (group) {
      return group.destroy();
    }
    return null;
  }

  static async getUsersByGroupId(groupId) {
    const group = await this.findByPk(groupId, {
      include: [{ model: this.sequelize.models.User, as: 'users' }],
    });
    return group ? group.users : null;
  }

  static async getRolesByGroupId(groupId) {
    const group = await this.findByPk(groupId, {
      include: [{ model: this.sequelize.models.Role, as: 'roles' }],
    });
    return group ? group.roles : null;
  }
}

module.exports = (sequelize) => {
  Group.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Group',
      tableName: 'groups',
      underscored: true,
      timestamps: false,
    },
  );

  return Group;
};
