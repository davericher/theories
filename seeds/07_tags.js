exports.seed = (knex) => {
  return knex('tag')
    .del()
    .then(function () {
      return knex('tag').insert([
        { name: 'Quantum' },
        { name: 'Relativity' },
        // ... add more tags as needed
      ]);
    });
};
