const { Model, DataTypes } = require('sequelize');

class Role extends Model {
  static associate(models) {
    // Assuming you have a User model and a join table model called UserRole
    this.belongsToMany(models.User, {
      through: 'UserRole',
      foreignKey: 'roleId',
      as: 'users',
    });
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async create(role) {
    return this.create(role);
  }

  static async getAll() {
    return this.findAll();
  }

  static async getById(roleId) {
    return this.findByPk(roleId);
  }

  static async delete(roleId) {
    const role = await this.findByPk(roleId);
    if (role) {
      return role.destroy();
    }
    return null;
  }

  static async getUsersByRoleId(roleId) {
    const role = await this.findByPk(roleId, {
      include: [{ model: this.sequelize.models.User, as: 'users' }],
    });
    return role ? role.users : null;
  }
}

module.exports = (sequelize) => {
  Role.init(
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
      modelName: 'Role',
      tableName: 'roles',
      underscored: true,
      timestamps: false,
    },
  );

  return Role;
};
