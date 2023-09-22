const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Citation extends Model {
    static associate(models) {
      Citation.belongsTo(models.Theory, {
        foreignKey: 'theoryId',
        as: 'theory',
      });
    }
  }

  Citation.init(
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
      },
      source: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // ... any other fields you might want to add
    },
    {
      sequelize,
      modelName: 'Citation',
      tableName: 'citation',
      timestamps: true,
    },
  );

  return Citation;
};
