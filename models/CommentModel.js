const { Model, DataTypes } = require('sequelize');

class Comment extends Model {
  static associate(models) {
    // Assuming you have a User model
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    // Assuming you have a Theory model
    this.belongsTo(models.Theory, { foreignKey: 'theoryId', as: 'theory' });
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async create(comment) {
    return this.create(comment);
  }

  static async findAll() {
    return this.findAll();
  }

  static async findById(commentId) {
    return this.findByPk(commentId);
  }

  static async delete(commentId) {
    const comment = await this.findByPk(commentId);
    if (comment) {
      return comment.destroy();
    }
    return null;
  }

  static async findByUserId(userId) {
    return this.findAll({ where: { userId } });
  }

  static async findByTheoryId(theoryId) {
    return this.findAll({ where: { theoryId } });
  }

  static async recentComments(limit = 10) {
    return this.findAll({ order: [['timestamp', 'DESC']], limit });
  }
}

module.exports = (sequelize) => {
  Comment.init(
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
      theoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'theories',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      content: {
        type: DataTypes.TEXT,
      },
      timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'comment',
      underscored: true,
      timestamps: false,
    },
  );

  return Comment;
};
