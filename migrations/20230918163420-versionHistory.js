/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('versionHistory', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      theoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'theories',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      versionNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dateOfChange: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      changedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      changeDescription: Sequelize.TEXT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('versionHistory');
  },
};
