const { Model, DataTypes } = require('sequelize');

class UserActivityLog extends Model {
  static associate(models) {
    // Assuming you have a User model
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async create(activityLog) {
    return this.create(activityLog);
  }

  static async findAll() {
    return this.findAll();
  }

  static async findById(activityLogId) {
    return this.findByPk(activityLogId);
  }

  static async delete(activityLogId) {
    const activityLog = await this.findByPk(activityLogId);
    if (activityLog) {
      return activityLog.destroy();
    }
    return null;
  }

  static async findByUserId(userId) {
    return this.findAll({ where: { userId } });
  }

  static async recentActivities(limit = 10) {
    return this.findAll({
      order: [['timestamp', 'DESC']],
      limit,
    });
  }

  static async findByActionType(actionType) {
    return this.findAll({ where: { actionType } });
  }

  static async logCommentActivity(userId, commentId) {
    return this.create({
      userId,
      actionType: 'COMMENT',
      entityId: commentId,
      timestamp: new Date(),
    });
  }

  static async logNotificationActivity(userId, notificationId) {
    return this.create({
      userId,
      actionType: 'NOTIFICATION',
      entityId: notificationId,
      timestamp: new Date(),
    });
  }
}

module.exports = (sequelize) => {
  UserActivityLog.init(
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
      actionType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      entityType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      additionalDetails: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'UserActivityLog',
      tableName: 'userActivityLog',
      underscored: true,
      timestamps: false,
    },
  );

  return UserActivityLog;
};
