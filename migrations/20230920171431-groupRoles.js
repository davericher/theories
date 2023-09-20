/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('groupRoles', {
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'groups',
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

    // Adding a composite primary key for groupId and roleId
    await queryInterface.addConstraint('groupRoles', {
      fields: ['groupId', 'roleId'],
      type: 'primary key',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('groupRoles');
  },
};
