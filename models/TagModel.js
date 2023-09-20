const { Model, DataTypes } = require('sequelize');

class Tag extends Model {
  static associate(models) {
    // Assuming you have a Theory model
    this.belongsToMany(models.Theory, {
      through: 'theoryTag',
      foreignKey: 'tagId',
      as: 'theories',
    });
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async create(tag) {
    return this.create(tag);
  }

  static async findAll() {
    return this.findAll();
  }

  static async findById(tagId) {
    return this.findByPk(tagId);
  }

  static async update(tagId, tagData) {
    const tag = await this.findByPk(tagId);
    if (tag) {
      return tag.update(tagData);
    }
    return null;
  }

  static async delete(tagId) {
    const tag = await this.findByPk(tagId);
    if (tag) {
      return tag.destroy();
    }
    return null;
  }

  static async findByName(name) {
    return this.findOne({ where: { name } });
  }

  static async findTheories(tagId) {
    return this.findByPk(tagId, {
      include: [{ model: this.sequelize.models.Theory, as: 'theories' }],
    });
  }
}

module.exports = (sequelize) => {
  Tag.init(
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
      modelName: 'Tag',
      tableName: 'tag',
      underscored: true,
      timestamps: false,
    },
  );

  return Tag;
};
