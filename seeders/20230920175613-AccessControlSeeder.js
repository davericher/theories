module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'accessControl',
      [
        {
          userId: 1, // Assuming the user with ID 1 exists
          entityId: 1, // Sample entity ID
          entityType: 'SampleType',
          accessType: 'read',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('accessControl', null, {});
  },
};
