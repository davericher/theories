module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'notification',
      [
        {
          userId: 1, // Assuming the user with ID 1 exists
          type: 'SampleType',
          message: 'Sample notification message',
          readStatus: false,
          timestamp: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('notification', null, {});
  },
};
