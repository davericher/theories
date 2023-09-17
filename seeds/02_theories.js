exports.seed = function (knex) {
  return knex('theories')
    .del()
    .then(function () {
      return knex('theories').insert([
        {
          name: 'Theory of Relativity',
          description: "Einstein's theory about spacetime.",
        },
        {
          name: 'Quantum Mechanics',
          description: 'Theory about the behavior of tiny particles.',
        },
        // ... add more theories as needed
      ]);
    });
};
