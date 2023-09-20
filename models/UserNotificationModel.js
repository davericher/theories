const { Model, DataTypes } = require('sequelize');

class UserNotification extends Model {
  static associate(models) {
    // Assuming you have a User model and Notification model
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.Notification, {
      foreignKey: 'notificationId',
      as: 'notification',
    });
  }

  // CRUD and other functions
  static async createEntry(data) {
    return this.create(data);
  }

  static async getAll() {
    return this.findAll();
  }

  static async getById(id) {
    return this.findByPk(id);
  }

  static async updateEntry(id, data) {
    const entry = await this.findByPk(id);
    if (entry) {
      return entry.update(data);
    }
    return null;
  }

  static async deleteEntry(id) {
    const entry = await this.findByPk(id);
    if (entry) {
      return entry.destroy();
    }
    return null;
  }

  static async getNotificationsByUserId(userId) {
    return this.findAll({
      where: { userId },
      include: [
        { model: this.sequelize.models.Notification, as: 'notification' },
      ],
    });
  }

  static async getUsersByNotificationId(notificationId) {
    return this.findAll({
      where: { notificationId },
      include: [{ model: this.sequelize.models.User, as: 'user' }],
    });
  }
}

module.exports = (sequelize) => {
  UserNotification.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      notificationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'notifications',
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      modelName: 'UserNotification',
      tableName: 'userNotifications',
      underscored: true,
    },
  );

  return UserNotification;
};
