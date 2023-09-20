const { Model, DataTypes } = require('sequelize');

class Theory extends Model {
  static associate(models) {
    // Relationships
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'proposer' });
    this.hasMany(models.Evidence, {
      foreignKey: 'supportsTheory',
      as: 'evidences',
    });
    this.hasMany(models.Comment, { foreignKey: 'theoryId', as: 'comments' });
  }

  // Basic CRUD (These are inherent in Sequelize, but I'm listing them for clarity)
  static async findAll() {
    return this.findAll();
  }

  static async findById(id) {
    return this.findByPk(id);
  }

  static async create(theory) {
    return this.create(theory);
  }

  static async update(id, theory) {
    const foundTheory = await this.findByPk(id);
    if (foundTheory) {
      return foundTheory.update(theory);
    }
    return null;
  }

  static async delete(id) {
    const foundTheory = await this.findByPk(id);
    if (foundTheory) {
      return foundTheory.destroy();
    }
    return null;
  }

  // Relationships
  static async findProposer(theoryId) {
    return this.findByPk(theoryId, {
      include: [{ model: this.sequelize.models.User, as: 'proposer' }],
    });
  }

  static async findEvidences(theoryId) {
    return this.sequelize.models.Evidence.findAll({
      where: { supportsTheory: theoryId },
    });
  }

  // Convenience functions
  static async findByName(name) {
    return this.findOne({ where: { name } });
  }

  static async findByStatus(status) {
    return this.findAll({ where: { status } });
  }

  static async incrementVersion(id) {
    const foundTheory = await this.findByPk(id);
    if (foundTheory) {
      foundTheory.increment('versionNumber');
      return foundTheory.save();
    }
    return null;
  }

  // Fetch all comments for a theory
  static async findComments(theoryId) {
    return this.sequelize.models.Comment.findAll({ where: { theoryId } });
  }
}

module.exports = (sequelize) => {
  Theory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
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
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Theory',
      tableName: 'theories',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  );

  return Theory;
};
