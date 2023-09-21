/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'evidence',
      [
        {
          description: 'Evidence for Sample Theory 1',
          datePresented: new Date(),
          source: 'Sample Source',
          supportsTheory: 1, // Assuming the theory with ID 1 exists
          presentedBy: 1, // Assuming the user with ID 1 exists
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('evidence', null, {});
  },
};
