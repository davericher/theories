module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'theoryDiscipline',
      [
        {
          theoryId: 1, // Assuming the theory with ID 1 exists
          disciplineId: 1, // Assuming the discipline with ID 1 exists
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('theoryDiscipline', null, {});
  },
};
