const { Model, DataTypes } = require('sequelize');

class Critic extends Model {
  static associate(models) {
    // Relationships
    this.hasMany(models.Critique, {
      foreignKey: 'presentedBy',
      as: 'critiques',
    });
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async findAll() {
    return this.findAll();
  }

  static async findById(id) {
    return this.findByPk(id);
  }

  static async create(critic) {
    return this.create(critic);
  }

  static async update(id, critic) {
    const foundCritic = await this.findByPk(id);
    if (foundCritic) {
      return foundCritic.update(critic);
    }
    return null;
  }

  static async delete(id) {
    const foundCritic = await this.findByPk(id);
    if (foundCritic) {
      return foundCritic.destroy();
    }
    return null;
  }

  // Relationships
  static async findCritiques(criticId) {
    return this.sequelize.models.Critique.findAll({
      where: { presentedBy: criticId },
    });
  }

  // Convenience functions
  static async findByName(firstName, lastName) {
    return this.findOne({ where: { firstName, lastName } });
  }

  static async findByAffiliation(affiliation) {
    return this.findAll({ where: { affiliation } });
  }
}

module.exports = (sequelize) => {
  Critic.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      affiliation: DataTypes.STRING,
      contactDetails: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Critic',
      tableName: 'critic',
      underscored: true,
      timestamps: false,
    },
  );

  return Critic;
};
