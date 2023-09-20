/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userGroups', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'groups',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });

    // Adding a composite primary key for userId and groupId
    await queryInterface.addConstraint('userGroups', {
      fields: ['userId', 'groupId'],
      type: 'primary key',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userGroups');
  },
};
