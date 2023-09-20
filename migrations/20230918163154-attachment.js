/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attachment', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      fileName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fileType: Sequelize.STRING,
      uploadDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      uploadedBy: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      associatedWithId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: Sequelize.TEXT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('attachment');
  },
};
