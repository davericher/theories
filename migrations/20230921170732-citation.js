/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('citation', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      theoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'theories',
          key: 'id',
        },
      },
      source: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      // ... any other fields you might want to add
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('citation');
  },
};
