const { Model, DataTypes } = require('sequelize');

class Notification extends Model {
  static associate(models) {
    // Assuming you have a User model
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async create(notification) {
    return this.create(notification);
  }

  static async findAll() {
    return this.findAll();
  }

  static async findById(notificationId) {
    return this.findByPk(notificationId);
  }

  static async delete(notificationId) {
    const notification = await this.findByPk(notificationId);
    if (notification) {
      return notification.destroy();
    }
    return null;
  }

  static async findByUserId(userId) {
    return this.findAll({ where: { userId } });
  }

  static async unreadNotifications(userId) {
    return this.findAll({ where: { userId, readStatus: false } });
  }

  static async markAsRead(notificationId) {
    const notification = await this.findByPk(notificationId);
    if (notification) {
      notification.readStatus = true;
      return notification.save();
    }
    return null;
  }

  // Assuming you have a UserNotification model for the getUsers function
  static async getUsers(notificationId) {
    return this.sequelize.models.UserNotification.findAll({
      where: { notificationId },
      include: [{ model: this.sequelize.models.User, as: 'user' }],
    });
  }
}

module.exports = (sequelize) => {
  Notification.init(
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
      type: {
        type: DataTypes.STRING,
      },
      message: {
        type: DataTypes.TEXT,
      },
      readStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Notification',
      tableName: 'notification',
      underscored: true,
      timestamps: false,
    },
  );

  return Notification;
};
