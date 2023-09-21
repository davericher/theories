module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'discipline',
      [
        {
          name: 'Sample Discipline 1',
          description: 'Description for Sample Discipline 1',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('discipline', null, {});
  },
};
