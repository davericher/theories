/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userRoles', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });

    // Adding a composite primary key for userId and roleId
    await queryInterface.addConstraint('userRoles', {
      fields: ['userId', 'roleId'],
      type: 'primary key',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userRoles');
  },
};
