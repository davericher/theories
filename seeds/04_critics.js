exports.seed = (knex) => {
  return knex('critic')
    .del()
    .then(() => {
      return knex('critic').insert([
        {
          firstName: 'John',
          lastName: 'Doe',
          affiliation: 'University A',
        },
        // ... add more critics as needed
      ]);
    });
};
