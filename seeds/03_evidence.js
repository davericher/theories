exports.seed = function (knex) {
  return knex('evidence')
    .del()
    .then(function () {
      return knex('evidence').insert([
        {
          source: 'Scientific Paper A',
          description: 'Evidence supporting Quantum Mechanics.',
          theoryId: 2,
        },
        // ... add more evidence as needed
      ]);
    });
};
