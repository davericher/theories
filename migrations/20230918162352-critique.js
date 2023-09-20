/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('critique', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      datePresented: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      source: {
        type: Sequelize.TEXT,
      },
      againstTheory: {
        type: Sequelize.INTEGER,
        references: {
          model: 'theories',
          key: 'id',
        },
      },
      presentedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'critic',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('critique');
  },
};
