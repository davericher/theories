const { Model, DataTypes } = require('sequelize');

class UserRole extends Model {
  static associate(models) {
    // Assuming you have a User model and Role model
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
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
    const userRole = await this.findByPk(id);
    if (userRole) {
      return userRole.destroy();
    }
    return null;
  }

  static async getRoleByUserId(userId) {
    return this.findAll({
      where: { userId },
      include: [{ model: this.sequelize.models.Role, as: 'role' }],
    });
  }

  static async getUserByRoleId(roleId) {
    return this.findAll({
      where: { roleId },
      include: [{ model: this.sequelize.models.User, as: 'user' }],
    });
  }
}

module.exports = (sequelize) => {
  UserRole.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
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
      modelName: 'UserRole',
      tableName: 'userRoles',
      underscored: true,
      timestamps: false,
    },
  );

  return UserRole;
};
