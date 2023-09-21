module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'critique',
      [
        {
          description: 'Sample Critique 1',
          datePresented: new Date(),
          source: 'Sample Source 1',
          againstTheory: 1, // Assuming the theory with ID 1 exists
          presentedBy: 1, // Assuming the critic with ID 1 exists
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('critique', null, {});
  },
};
