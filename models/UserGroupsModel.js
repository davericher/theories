const { Model, DataTypes } = require('sequelize');

class UserGroup extends Model {
  static associate(models) {
    // Assuming you have a User model and Group model
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.Group, { foreignKey: 'groupId', as: 'group' });
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async create(data) {
    return this.create(data);
  }

  static async getAll() {
    return this.findAll();
  }

  static async getById(id) {
    return this.findByPk(id);
  }

  static async delete(id) {
    const userGroup = await this.findByPk(id);
    if (userGroup) {
      return userGroup.destroy();
    }
    return null;
  }

  static async getUserByGroupId(groupId) {
    return this.findAll({
      where: { groupId },
      include: [{ model: User, as: 'user' }],
    });
  }

  static async getGroupByUserId(userId) {
    return this.findAll({
      where: { userId },
      include: [{ model: Group, as: 'group' }],
    });
  }
}

module.exports = (sequelize) => {
  UserGroup.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'groups',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'UserGroup',
      tableName: 'userGroups',
      underscored: true,
      timestamps: false,
    },
  );

  return UserGroup;
};
