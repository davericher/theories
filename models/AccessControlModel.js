const { Model, DataTypes } = require('sequelize');

class AccessControl extends Model {
  static associate(models) {
    // Assuming you have a User model
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async create(accessControl) {
    return this.create(accessControl);
  }

  static async findAll() {
    return this.findAll();
  }

  static async findById(accessControlId) {
    return this.findByPk(accessControlId);
  }

  static async delete(accessControlId) {
    const accessControl = await this.findByPk(accessControlId);
    if (accessControl) {
      return accessControl.destroy();
    }
    return null;
  }

  static async findByUserId(userId) {
    return this.findAll({ where: { userId } });
  }

  static async findByEntityIdAndType(entityId, entityType) {
    return this.findAll({ where: { entityId, entityType } });
  }

  static async userHasAccess(userId, entityId, entityType, accessType) {
    return this.findOne({
      where: { userId, entityId, entityType, accessType },
    });
  }
}

module.exports = (sequelize) => {
  AccessControl.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      entityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      entityType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accessType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'AccessControl',
      tableName: 'accessControl',
      underscored: true,
      timestamps: false,
    },
  );

  return AccessControl;
};
