module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'comment',
      [
        {
          userId: 1, // Assuming the user with ID 1 exists
          theoryId: 1, // Assuming the theory with ID 1 exists
          content: 'Sample comment content',
          timestamp: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comment', null, {});
  },
};
