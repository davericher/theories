exports.seed = function (knex) {
  return knex('attachment')
    .del()
    .then(function () {
      return knex('attachment').insert([
        { fileType: 'pdf', filePath: '/path/to/file.pdf', associatedWithId: 1 },
        // ... add more attachments as needed
      ]);
    });
};
