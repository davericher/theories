const { Model, DataTypes } = require('sequelize');

class Critique extends Model {
  static associate(models) {
    // Relationships
    this.belongsTo(models.Critic, { foreignKey: 'presentedBy', as: 'critic' });
    this.belongsTo(models.Theory, {
      foreignKey: 'againstTheory',
      as: 'targetedTheory',
    });
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async findAll() {
    return this.findAll();
  }

  static async findById(id) {
    return this.findByPk(id);
  }

  static async create(critique) {
    return this.create(critique);
  }

  static async update(id, critique) {
    const foundCritique = await this.findByPk(id);
    if (foundCritique) {
      return foundCritique.update(critique);
    }
    return null;
  }

  static async delete(id) {
    const foundCritique = await this.findByPk(id);
    if (foundCritique) {
      return foundCritique.destroy();
    }
    return null;
  }

  // Relationships
  static async findCritic(critiqueId) {
    return this.findByPk(critiqueId, {
      include: [{ model: this.sequelize.models.Critic, as: 'critic' }],
    });
  }

  static async findTargetedTheory(critiqueId) {
    return this.findByPk(critiqueId, {
      include: [{ model: this.sequelize.models.Theory, as: 'targetedTheory' }],
    });
  }

  // Convenience functions
  static async findBySource(source) {
    return this.findAll({ where: { source } });
  }

  static async recentCritiques(limit = 10) {
    return this.findAll({ order: [['datePresented', 'DESC']], limit });
  }
}

module.exports = (sequelize) => {
  Critique.init(
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
      againstTheory: {
        type: DataTypes.INTEGER,
        references: {
          model: 'theories',
          key: 'id',
        },
      },
      presentedBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'critic',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Critique',
      tableName: 'critique',
      underscored: true,
      timestamps: true,
      createdAt: 'datePresented',
      updatedAt: false,
    },
  );

  return Critique;
};
