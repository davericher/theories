/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'theories',
      [
        {
          title: 'Sample Theory 1',
          description: 'Description for Sample Theory 1',
          userId: 1, // Assuming the user with ID 1 exists
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('theories', null, {});
  },
};
