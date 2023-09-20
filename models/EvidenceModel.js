const { Model, DataTypes } = require('sequelize');

class Evidence extends Model {
  static associate(models) {
    // Relationships
    this.belongsTo(models.User, { foreignKey: 'presentedBy', as: 'presenter' });
    this.belongsTo(models.Theory, {
      foreignKey: 'supportsTheory',
      as: 'supportedTheory',
    });
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async findAll() {
    return this.findAll();
  }

  static async findById(id) {
    return this.findByPk(id);
  }

  static async create(evidence) {
    return this.create(evidence);
  }

  static async update(id, evidence) {
    const foundEvidence = await this.findByPk(id);
    if (foundEvidence) {
      return foundEvidence.update(evidence);
    }
    return null;
  }

  static async delete(id) {
    const foundEvidence = await this.findByPk(id);
    if (foundEvidence) {
      return foundEvidence.destroy();
    }
    return null;
  }

  // Relationships
  static async findPresenter(evidenceId) {
    return this.findByPk(evidenceId, {
      include: [{ model: this.sequelize.models.User, as: 'presenter' }],
    });
  }

  static async findSupportedTheory(evidenceId) {
    return this.findByPk(evidenceId, {
      include: [{ model: this.sequelize.models.Theory, as: 'supportedTheory' }],
    });
  }

  // Convenience functions
  static async findBySource(source) {
    return this.findAll({ where: { source } });
  }

  static async recentEvidences(limit = 10) {
    return this.findAll({ order: [['datePresented', 'DESC']], limit });
  }
}

module.exports = (sequelize) => {
  Evidence.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      datePresented: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      source: DataTypes.TEXT,
      supportsTheory: {
        type: DataTypes.INTEGER,
        references: {
          model: 'theories',
          key: 'id',
        },
      },
      presentedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Evidence',
      tableName: 'evidence',
      underscored: true,
      timestamps: true,
      createdAt: 'datePresented',
      updatedAt: false,
    },
  );

  return Evidence;
};
