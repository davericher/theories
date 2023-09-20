const { Model, DataTypes } = require('sequelize');

class UserFavorite extends Model {
  static associate(models) {
    // Assuming you have a User model and Theory model
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    this.belongsTo(models.Theory, { foreignKey: 'theoryId', as: 'theory' });
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

  static async getFavoritesByUserId(userId) {
    return this.findAll({
      where: { userId },
      include: [{ model: this.sequelize.models.Theory, as: 'theory' }],
    });
  }

  static async getUsersByFavoriteTheory(theoryId) {
    return this.findAll({
      where: { theoryId },
      include: [{ model: this.sequelize.models.User, as: 'user' }],
    });
  }
}

module.exports = (sequelize) => {
  UserFavorite.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      theoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'theories',
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      modelName: 'UserFavorite',
      tableName: 'userFavorites',
      underscored: true,
    },
  );

  return UserFavorite;
};
