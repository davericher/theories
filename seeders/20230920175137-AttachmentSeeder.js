module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'attachment',
      [
        {
          fileName: 'SampleFile1.txt',
          fileType: 'text/plain',
          fileURL:
            'https://dummypdf.readthedocs.io/en/latest/_downloads/04d2e9f24079f6f640f04ed2531c04d3/example1.pdf',
          uploadDate: new Date(),
          uploadedBy: 1, // Assuming the user with ID 1 exists
          associatedWithId: 1, // Assuming it's associated with theory ID 1
          description: 'Sample attachment description 1',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('attachment', null, {});
  },
};
