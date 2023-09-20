const { Model, DataTypes } = require('sequelize');

class VersionHistory extends Model {
  static associate(models) {
    // Assuming you have a User model and a Theory model
    this.belongsTo(models.User, { foreignKey: 'changedBy', as: 'changer' });
    this.belongsTo(models.Theory, { foreignKey: 'theoryId', as: 'theory' });
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async create(versionHistory) {
    return this.create(versionHistory);
  }

  static async findByTheoryId(theoryId) {
    return this.findAll({ where: { theoryId } });
  }

  static async findById(versionHistoryId) {
    return this.findByPk(versionHistoryId);
  }

  static async update(versionHistoryId, versionHistoryData) {
    const versionHistory = await this.findByPk(versionHistoryId);
    if (versionHistory) {
      return versionHistory.update(versionHistoryData);
    }
    return null;
  }

  static async delete(versionHistoryId) {
    const versionHistory = await this.findByPk(versionHistoryId);
    if (versionHistory) {
      return versionHistory.destroy();
    }
    return null;
  }

  static async findLatestVersion(theoryId) {
    return this.findOne({
      where: { theoryId },
      order: [['versionNumber', 'DESC']],
    });
  }
}

module.exports = (sequelize) => {
  VersionHistory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      theoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'theories',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      versionNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      dateOfChange: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      changedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      changeDescription: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'VersionHistory',
      tableName: 'versionHistory',
      underscored: true,
      timestamps: false,
    },
  );

  return VersionHistory;
};
