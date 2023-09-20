const { Model, DataTypes } = require('sequelize');

class TheoryDiscipline extends Model {
  static associate(models) {
    // Relationships
    this.belongsTo(models.Theory, { foreignKey: 'theoryId', as: 'theory' });
    this.belongsTo(models.Discipline, {
      foreignKey: 'disciplineId',
      as: 'discipline',
    });
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async findAll() {
    return this.findAll();
  }

  static async findById(id) {
    return this.findByPk(id);
  }

  static async create(theoryDiscipline) {
    return this.create(theoryDiscipline);
  }

  static async delete(id) {
    const foundTheoryDiscipline = await this.findByPk(id);
    if (foundTheoryDiscipline) {
      return foundTheoryDiscipline.destroy();
    }
    return null;
  }

  // Relationships
  static async findTheory(theoryDisciplineId) {
    return this.findByPk(theoryDisciplineId, {
      include: [{ model: this.sequelize.models.Theory, as: 'theory' }],
    });
  }

  static async findDiscipline(theoryDisciplineId) {
    return this.findByPk(theoryDisciplineId, {
      include: [{ model: this.sequelize.models.Discipline, as: 'discipline' }],
    });
  }

  // Convenience functions
  static async findByTheoryId(theoryId) {
    return this.findAll({ where: { theoryId } });
  }

  static async findByDisciplineId(disciplineId) {
    return this.findAll({ where: { disciplineId } });
  }
}

module.exports = (sequelize) => {
  TheoryDiscipline.init(
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
      disciplineId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'discipline',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'TheoryDiscipline',
      tableName: 'theoryDiscipline',
      underscored: true,
      timestamps: false,
    },
  );

  return TheoryDiscipline;
};
