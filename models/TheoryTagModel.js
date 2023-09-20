const { Model, DataTypes } = require('sequelize');

class TheoryTag extends Model {
  static associate(models) {
    // Assuming you have a Theory and Tag model
    this.belongsTo(models.Theory, { foreignKey: 'theoryId', as: 'theory' });
    this.belongsTo(models.Tag, { foreignKey: 'tagId', as: 'tag' });
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async create(theoryTag) {
    return this.create(theoryTag);
  }

  static async findAll() {
    return this.findAll();
  }

  static async findById(theoryTagId) {
    return this.findByPk(theoryTagId);
  }

  static async delete(theoryTagId) {
    const theoryTag = await this.findByPk(theoryTagId);
    if (theoryTag) {
      return theoryTag.destroy();
    }
    return null;
  }

  static async findTheory(theoryTagId) {
    return this.findByPk(theoryTagId, {
      include: [{ model: this.sequelize.models.Theory, as: 'theory' }],
    });
  }

  static async findTag(theoryTagId) {
    return this.findByPk(theoryTagId, {
      include: [{ model: this.sequelize.models.Tag, as: 'tag' }],
    });
  }

  static async findByTheoryId(theoryId) {
    return this.findAll({ where: { theoryId } });
  }

  static async findByTagId(tagId) {
    return this.findAll({ where: { tagId } });
  }
}

module.exports = (sequelize) => {
  TheoryTag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tag',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'TheoryTag',
      tableName: 'theoryTag',
      underscored: true,
      timestamps: false,
    },
  );

  return TheoryTag;
};
