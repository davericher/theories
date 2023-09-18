exports.seed = (knex) => {
  return knex('critique')
    .del()
    .then(function () {
      return knex('critique').insert([
        {
          source: 'Paper X',
          description: 'Critique against Quantum Mechanics.',
          againstTheory: 2,
          presentedBy: 1,
        },
        // ... add more critiques as needed
      ]);
    });
};
