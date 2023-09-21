/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'critic',
      [
        {
          firstName: 'Sample Critic First Name',
          lastName: 'Sample Critic Last Name',
          affiliation: 'Sample Affiliation',
          contactDetails: 'Sample Contact Details',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('critic', null, {});
  },
};
