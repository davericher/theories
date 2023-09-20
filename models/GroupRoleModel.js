const { Model, DataTypes } = require('sequelize');

class GroupRole extends Model {
  static associate(models) {
    // Assuming you have a Group model and Role model
    this.belongsTo(models.Group, { foreignKey: 'groupId', as: 'group' });
    this.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
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
    const groupRole = await this.findByPk(id);
    if (groupRole) {
      return groupRole.destroy();
    }
    return null;
  }

  static async getRoleByGroupId(groupId) {
    return this.findAll({
      where: { groupId },
      include: [{ model: this.sequelize.models.Role, as: 'role' }],
    });
  }

  static async getGroupByRoleId(roleId) {
    return this.findAll({
      where: { roleId },
      include: [{ model: this.sequelize.models.Group, as: 'group' }],
    });
  }
}

module.exports = (sequelize) => {
  GroupRole.init(
    {
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'groups',
          key: 'id',
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'GroupRole',
      tableName: 'groupRoles',
      underscored: true,
      timestamps: false,
    },
  );

  return GroupRole;
};
