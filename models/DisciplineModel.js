const { Model, DataTypes } = require('sequelize');

class Discipline extends Model {
  static associate(models) {
    // Relationships
    this.belongsToMany(models.Theory, {
      through: 'theoryDiscipline',
      foreignKey: 'disciplineId',
      otherKey: 'theoryId',
      as: 'theories',
    });
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async findAll() {
    return this.findAll();
  }

  static async findById(id) {
    return this.findByPk(id);
  }

  static async create(discipline) {
    return this.create(discipline);
  }

  static async update(id, discipline) {
    const foundDiscipline = await this.findByPk(id);
    if (foundDiscipline) {
      return foundDiscipline.update(discipline);
    }
    return null;
  }

  static async delete(id) {
    const foundDiscipline = await this.findByPk(id);
    if (foundDiscipline) {
      return foundDiscipline.destroy();
    }
    return null;
  }

  // Relationships
  static async findTheories(disciplineId) {
    return this.findByPk(disciplineId, {
      include: [{ model: this.sequelize.models.Theory, as: 'theories' }],
    });
  }

  // Convenience functions
  static async findByName(name) {
    return this.findOne({ where: { name } });
  }
}

module.exports = (sequelize) => {
  Discipline.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Discipline',
      tableName: 'discipline',
      underscored: true,
      timestamps: false,
    },
  );

  return Discipline;
};
