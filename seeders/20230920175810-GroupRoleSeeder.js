module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'groupRoles',
      [
        {
          groupId: 1, // Assuming the group with ID 1 exists
          roleId: 1, // Assuming the role with ID 1 exists
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('groupRoles', null, {});
  },
};
